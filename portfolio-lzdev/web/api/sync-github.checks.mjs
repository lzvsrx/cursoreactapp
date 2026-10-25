import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import handler from './sync-github.ts';

const previousEnv = { ...process.env };
const originalFetch = globalThis.fetch;
afterEach(() => { process.env = { ...previousEnv }; globalThis.fetch = originalFetch; });
async function request(body, options = {}) {
  process.env.GITHUB_SYNC_SECRET = 'test-only-secret';
  process.env.GITHUB_TOKEN = 'test-only-token';
  const response = { statusCode: 0, data: null, status(code) { this.statusCode = code; return this; }, setHeader() { return this; }, end(data) { this.data = JSON.parse(data); } };
  await handler({ method: 'POST', headers: { 'x-sync-secret': 'test-only-secret' }, body, ...options }, response);
  return response;
}
test('rejects invalid JSON, null bodies, null files and forbidden paths without calling GitHub', async () => {
  globalThis.fetch = () => { throw new Error('Unexpected network call'); };
  for (const body of ['{', null, [], { files: [null] }, { files: [{ path: '.env', content: 'x' }] }, { files: [{ path: 'data/admin-content.json' }] }]) {
    assert.equal((await request(body)).statusCode, 400);
  }
});
test('rejects incorrect secret and unsupported method', async () => {
  assert.equal((await request({}, { headers: {} })).statusCode, 401);
  assert.equal((await request({}, { method: 'GET' })).statusCode, 405);
});
test('rejects duplicate paths and oversized content', async () => {
  const file = { path: 'data/admin-content.json', content: {} };
  assert.equal((await request({ files: [file, file] })).statusCode, 400);
  assert.equal((await request({ files: [{ ...file, content: 'x'.repeat(1024 * 1024) }] })).statusCode, 413);
});
test('publishes allowed content using mocked GitHub responses', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return options.method === 'PUT' ? { ok: true } : { status: 404 }; };
  const response = await request({ files: [{ path: 'data/admin-content.json', content: { title: 'Test' } }] });
  assert.equal(response.statusCode, 200);
  assert.equal(calls.length, 2);
  const payload = JSON.parse(calls[1].options.body);
  assert.deepEqual(JSON.parse(Buffer.from(payload.content, 'base64').toString()), { title: 'Test' });
});
test('does not expose upstream response details on failure', async () => {
  globalThis.fetch = async () => { throw new Error('private server detail'); };
  const response = await request({ files: [{ path: 'data/admin-content.json', content: {} }] });
  assert.equal(response.statusCode, 502);
  assert.ok(!JSON.stringify(response.data).includes('private server detail'));
});
