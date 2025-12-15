import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;

  @tracked currentSession = null;

  get isAuthenticated() {
    return Boolean(this.currentSession);
  }

  setSession(sessionData) {
    this.currentSession = sessionData;
  }

  clearSession() {
    this.currentSession = null;
  }

  async getMe() {
    try {
      const user = await this.store.queryRecord('user', { me: true });
      console.log('Ember Data /me user record:', user);
      this.currentSession = user;
      return user;
    } catch (error) {
      console.error('Error loading current user via Ember Data /me:', error);
      throw error;
    }
  }
}
