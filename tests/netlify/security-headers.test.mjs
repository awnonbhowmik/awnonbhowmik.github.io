import assert from 'node:assert/strict';
import test from 'node:test';
import securityHeaders, {
  addScriptNonce,
  createContentSecurityPolicy,
} from '../../netlify/edge-functions/security-headers.mjs';

test('adds the nonce to inline and external scripts without duplicating it', () => {
  const html = '<script>one()</script><script src="/app.js"></script><script nonce="old">two()</script>';
  assert.equal(
    addScriptNonce(html, 'abc123'),
    '<script nonce="abc123">one()</script><script nonce="abc123" src="/app.js"></script><script nonce="old">two()</script>'
  );
});

test('creates a script policy without unsafe-inline', () => {
  const policy = createContentSecurityPolicy('abc123');
  assert.match(policy, /script-src 'self' 'nonce-abc123'/);
  assert.doesNotMatch(policy, /script-src[^;]*'unsafe-inline'/);
  assert.doesNotMatch(policy, /style-src(?!-attr)[^;]*'unsafe-inline'/);
  assert.match(policy, /style-src-attr 'unsafe-inline'/);
  assert.match(policy, /connect-src 'self'/);
});

test('rewrites HTML responses and leaves non-HTML responses untouched', async () => {
  const htmlResponse = await securityHeaders(new Request('https://example.com/'), {
    next: async () => new Response('<script>hydrate()</script>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }),
  });

  const policy = htmlResponse.headers.get('Content-Security-Policy');
  const nonce = policy?.match(/'nonce-([^']+)'/)?.[1];
  assert.ok(nonce);
  assert.match(await htmlResponse.text(), new RegExp(`<script nonce="${nonce}">`));

  const json = new Response('{}', { headers: { 'Content-Type': 'application/json' } });
  const jsonResponse = await securityHeaders(new Request('https://example.com/api'), {
    next: async () => json,
  });
  assert.equal(jsonResponse, json);
});
