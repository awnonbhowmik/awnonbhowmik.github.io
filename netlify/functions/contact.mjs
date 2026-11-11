const MAX_BODY_BYTES = 8 * 1024;
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  message: 5000,
  website: 200,
};

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const jsonResponse = (status, message, extraHeaders = {}) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });

const normalizeString = (value, maxLength) => {
  if (typeof value !== 'string' || value.length > maxLength) return null;
  return value.trim();
};

export function validateContactPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { error: 'Invalid request.' };
  }

  const website = normalizeString(payload.website ?? '', MAX_LENGTHS.website);
  if (website === null) return { error: 'Invalid request.' };
  if (website) return { honeypot: true };

  const name = normalizeString(payload.name, MAX_LENGTHS.name);
  const email = normalizeString(payload.email, MAX_LENGTHS.email)?.toLowerCase() ?? null;
  const message = normalizeString(payload.message, MAX_LENGTHS.message);

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' };
  }

  if (name.length < 2 || /[\u0000-\u001f\u007f]/.test(name)) {
    return { error: 'Please enter a valid name.' };
  }

  const [localPart, domain, ...extraParts] = email.split('@');
  if (
    extraParts.length > 0 ||
    !localPart ||
    !domain ||
    localPart.length > 64 ||
    domain.length > 255 ||
    email.startsWith('.') ||
    email.endsWith('.') ||
    email.includes('..') ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { error: 'Please enter a valid email address.' };
  }

  if (message.length < 10 || message.includes('\u0000')) {
    return { error: 'Message must be at least 10 characters long.' };
  }

  return { value: { name, email, message } };
}

export default async function contact(request) {
  if (request.method !== 'POST') {
    return jsonResponse(405, 'Method not allowed.', { Allow: 'POST' });
  }

  const requestOrigin = request.headers.get('Origin');
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return jsonResponse(403, 'Invalid request origin.');
  }

  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return jsonResponse(415, 'Content-Type must be application/json.');
  }

  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse(413, 'Request is too large.');
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(400, 'Invalid request body.');
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse(413, 'Request is too large.');
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, 'Invalid JSON.');
  }

  const validated = validateContactPayload(payload);
  if (validated.honeypot) return jsonResponse(200, 'Message sent successfully!');
  if (validated.error) return jsonResponse(400, validated.error);

  const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('Contact form is missing required EmailJS configuration.');
    return jsonResponse(503, 'Contact form is temporarily unavailable.');
  }

  const emailRequest = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      from_name: validated.value.name,
      from_email: validated.value.email,
      message: validated.value.message,
    },
  };

  if (privateKey) emailRequest.accessToken = privateKey;

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailRequest),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`EmailJS rejected a contact request with status ${response.status}.`);
      return jsonResponse(502, 'Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('EmailJS contact request failed.', error instanceof Error ? error.name : 'UnknownError');
    return jsonResponse(502, 'Failed to send message. Please try again.');
  }

  return jsonResponse(200, 'Message sent successfully!');
}

export const config = {
  path: '/api/contact',
  method: ['POST'],
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip'],
    windowLimit: 3,
    windowSize: 60,
  },
};
