import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class GroupsController extends Controller {
  @service store;
  @service session;

  get currentUser() {
    return this.session.currentSession;
  }

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
      this.send('refreshRoute');
    } catch (e) {
      console.error('Error joining group', e);
    }
  }

  @action
  async leaveGroup(group) {
    if (!group || !group.id) {
      console.error('leaveGroup called without a valid group');
      return;
    }

    const groupId = group.id;

    try {
      const adapter = this.store.adapterFor('group');

      if (typeof adapter.leaveGroup !== 'function') {
        console.error('groups adapter has no leaveGroup method');
        return;
      }

      await adapter.leaveGroup(this.store, groupId);
      console.log('Left group successfully via adapter:', groupId);
      this.send('refreshRoute');
    } catch (e) {
      console.error('Error leaving group', e);
    }
  }
}
