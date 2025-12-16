import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SessionController extends Controller {
  @service router;
  @service session;

  @tracked email = '';
  @tracked password = '';
  @tracked errorMessage = null;
  @tracked isAuthenticating = false;

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  async login(event) {
    event.preventDefault();

    this.errorMessage = null;
    this.isAuthenticating = true;

    try {
      await this.session.login(this.email, this.password);
      this.router.transitionTo('me');
    } catch (err) {
      console.error('Login error:', err);
      this.errorMessage = err.message || "It wasn't possible to log in.";
      this.password = '';
    } finally {
      this.isAuthenticating = false;
    }
  }
}
