const POLICY_PARTS = [
  "default-src 'self'",
  "script-src 'self' 'nonce-__NONCE__'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  'frame-src https://www.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];

export const createContentSecurityPolicy = (nonce) =>
  POLICY_PARTS.join('; ').replace('__NONCE__', nonce);

export const addScriptNonce = (html, nonce) =>
  html.replace(/<script\b(?![^>]*\bnonce=)([^>]*)>/gi, `<script nonce="${nonce}"$1>`);

export default async function securityHeaders(_request, context) {
  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('text/html')) return response;

  const nonce = crypto.randomUUID().replaceAll('-', '');
  const html = addScriptNonce(await response.text(), nonce);
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', createContentSecurityPolicy(nonce));
  headers.delete('Content-Length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
