import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
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
}

