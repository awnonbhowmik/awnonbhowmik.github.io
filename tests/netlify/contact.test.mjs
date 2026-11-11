import assert from 'node:assert/strict';
import test from 'node:test';
import contact, { config, validateContactPayload } from '../../netlify/functions/contact.mjs';

test('normalizes and validates contact payloads', () => {
  assert.deepEqual(
    validateContactPayload({
      name: '  Ada Lovelace  ',
      email: '  ADA@EXAMPLE.COM ',
      message: '  A sufficiently long message.  ',
      website: '',
    }),
    {
      value: {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'A sufficiently long message.',
      },
    }
  );
});

test('rejects malformed input and silently accepts the honeypot', () => {
  assert.deepEqual(
    validateContactPayload({ name: 'A', email: 'bad', message: 'short', website: '' }),
    { error: 'Please enter a valid name.' }
  );
  assert.deepEqual(validateContactPayload({ website: 'https://spam.example' }), { honeypot: true });
});

test('rejects cross-origin and non-JSON requests', async () => {
  const crossOrigin = await contact(
    new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' },
      body: '{}',
    })
  );
  assert.equal(crossOrigin.status, 403);

  const wrongType = await contact(
    new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '{}',
    })
  );
  assert.equal(wrongType.status, 415);
});

test('declares an IP-based three-per-minute platform rate limit', () => {
  assert.deepEqual(config.method, ['POST']);
  assert.deepEqual(config.rateLimit, {
    action: 'rate_limit',
    aggregateBy: ['ip'],
    windowLimit: 3,
    windowSize: 60,
  });
});
