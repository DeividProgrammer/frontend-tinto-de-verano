import ApplicationAdapter from './application';

export default class WeeklyCountAdapter extends ApplicationAdapter {
  queryRecord(store, type, query = {}) {
    if (query.action === 'increment') {
      const baseUrl = this.buildURL('weekly-count');
      const url = `${baseUrl}/increment`;

      return this.ajax(url, 'POST');
    }

    if (query.action === 'decrement') {
      const baseUrl = this.buildURL('weekly-count');
      const url = `${baseUrl}/decrement`;

      return this.ajax(url, 'POST');
    }

    return super.queryRecord(store, type, query);
  }
}

