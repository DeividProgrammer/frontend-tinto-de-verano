import { module, test } from 'qunit';
import { setupTest } from 'frontend-tinto-verano/tests/helpers';

module('Unit | Route | groups/group', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:groups/group');
    assert.ok(route);
  });
});
