import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class GroupModel extends Model {
  @attr('string') name;
  @attr('string') status;
  @service session;

  get isMember() {
    const user = this.session.currentSession;
    if (!user) {
      console.warn(`[GroupModel] isMember: No currentSession available for group ${this.id}`);
      return false;
    }

    try {
      const ref = user.hasMany('groups');
      const ids = ref.ids();


      const hasIdMatch = ids.includes(this.id);

      if (hasIdMatch) {
        return true;
      }

      return false;
    } catch (e) {
      console.error('[GroupModel] Error in isMember:', e);
      return false;
    }
  }

  get statusDisplay() {
    const statusUri = this.status;
    if (!statusUri) {
      return '';
    }
    const parts = statusUri.split('/');
    return parts[parts.length - 1] ?? statusUri;
  }
}
