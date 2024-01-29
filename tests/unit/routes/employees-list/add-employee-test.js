import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | employees-list/add-employee', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:employees-list/add-employee');
    assert.ok(route);
  });
});
