import { module, test } from 'qunit';
import { setupTest } from 'frontend-tinto-verano/tests/helpers';

module('Unit | Controller | groups/group/leaderboard', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:groups/group/leaderboard');
    assert.ok(controller);
  });
});
