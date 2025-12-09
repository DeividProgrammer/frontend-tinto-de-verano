import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  async queryRecord(store, type, query) {
    if (type.modelName === 'user' && query.me) {
      const url = '/me';
      const payload = await this.ajax(url, 'GET');

      // Log para ver la respuesta cruda del backend
      console.log(
        'Raw backend response for /me:',
        JSON.stringify(payload, null, 2)
      );

      return payload;
    }
    return super.queryRecord(...arguments);
  }
}
