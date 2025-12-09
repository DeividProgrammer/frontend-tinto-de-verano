import Service, { service } from '@ember/service';

export default class GroupsService extends Service {
  @service store;

  async getGroups() {
    const groups = await this.store.findAll('group');

    return groups.map((group) => ({
      id: group.id,
      name: group.name,
      status: this._shortStatus(group.status),
    }));
  }

  _shortStatus(statusUri) {
    if (!statusUri) {
      return '';
    }

    const parts = statusUri.split('/');
    return parts[parts.length - 1] ?? statusUri;
  }
}
