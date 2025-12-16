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

  async login(email, password) {
    try {
      const response = await fetch('/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: {
            type: 'sessions',
            attributes: {
              email: email,
              password: password,
            },
          },
        }),
      });

      if (!response.ok) {
        let errorText;
        try {
          const text = await response.text();
          console.log('Login failed response body:', text);
          try {
            const errorJson = JSON.parse(text);
            errorText = errorJson.errors?.[0]?.detail || response.statusText;
          } catch {
            errorText = text || response.statusText;
          }
        } catch (parseError) {
          console.error('Login response parsing error:', parseError);
          errorText = response.statusText;
        }
        throw new Error(errorText || 'Login error');
      }

      const data = await response.json();
      console.log('Correct Login, server response:', data);

      this.setSession(data.data);
      return data.data;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
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
