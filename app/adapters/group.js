import ApplicationAdapter from './application';

export default class GroupAdapter extends ApplicationAdapter {
  async joinGroup(store, groupId) {
    const baseUrl = this.buildURL('group', groupId, null, 'findRecord');
    const url = `${baseUrl}/join`;

    const response = await this.ajax(url, 'POST', {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });

    return response;
  }
}
