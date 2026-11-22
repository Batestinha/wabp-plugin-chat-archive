const { test } = require('node:test');
const assert = require('node:assert/strict');
const plugin = require('../dist').default;
test('external archive access, links and notices respect current scoped settings', async () => {
  let config = { browserLinks: false, websiteNotices: true, noticeTemplate: 'Ready' };
  const [{ methods: [resolve] }] = plugin.registerServices({ configFor: async scope => {
    assert.equal(scope, 'scope'); return config;
  } });
  const read = feature => resolve.handler({ feature }, { scopeId: 'scope' });
  assert.deepEqual(await read('externalAccess'), { allowed: true });
  assert.deepEqual(await read('browserLinks'), { allowed: false });
  assert.deepEqual(await read('websiteNotices'), { allowed: true, noticeTemplate: 'Ready' });
  config = { externalAccess: false, browserLinks: true, websiteNotices: true };
  for (const feature of ['externalAccess', 'browserLinks', 'websiteNotices']) assert.deepEqual(await read(feature), { allowed: false });
});
