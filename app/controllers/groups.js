import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class GroupsController extends Controller {
  @service store;

  @action
  async joinGroup(group) {
    if (!group || !group.id) {
      console.error('joinGroup called without a valid group');
      return;
    }

    const groupId = group.id;

    try {
      const adapter = this.store.adapterFor('group');

      if (typeof adapter.joinGroup !== 'function') {
        console.error('groups adapter has no joinGroup method');
        return;
      }

      await adapter.joinGroup(this.store, groupId);
      console.log('Joined group successfully via adapter:', groupId);
    } catch (e) {
      console.error('Error joining group', e);
    }
  }
}
