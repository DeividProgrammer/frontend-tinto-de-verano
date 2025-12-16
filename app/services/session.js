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

  async invalidate() {
    try {
      await fetch('/session', { method: 'DELETE' });
    } catch (error) {
      console.error('Error during backend logout:', error);
    } finally {
      this.clearSession();
    }
  }

  clearSession() {
    this.currentSession = null;
    this.store.unloadAll();
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
