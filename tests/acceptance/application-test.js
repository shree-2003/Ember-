import { module, test } from 'qunit';
import { click,fillIn,visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);
  
  test('should add new employee details', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/employees-list');
    await click('[data-test-button]');
    await visit('add-employee');
    assert.equal(currentURL(), '/add-employee');
    await visit('employees-list');
    assert.equal(currentURL(),'/employees-list');
    await this.pauseTest();
  });
});
