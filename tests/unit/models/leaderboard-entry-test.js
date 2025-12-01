import { setupTest } from 'frontend-tinto-verano/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | leaderboard entry', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('leaderboard-entry', {});
    assert.ok(model, 'model exists');
  });
});
