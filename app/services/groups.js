import Service, { service } from '@ember/service';

export default class GroupsService extends Service {
  @service store;

  async getGroups() {
    return await this.store.findAll('group');
  }

  _shortStatus(statusUri) {
    if (!statusUri) {
      return '';
    }

    const parts = statusUri.split('/');
    return parts[parts.length - 1] ?? statusUri;
  }
}
