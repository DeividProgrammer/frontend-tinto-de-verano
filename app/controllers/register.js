import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service store;
  @service router;
  @service session;

  /*
  Ejemplo de payload que el backend espera:
  {
    "data": {
      "type": "accounts",
      "attributes": {
        "nickname": "test",
        "name": "test",
        "email": "test@example.com",
        "password": "2",
        "password-confirmation": "2"
      }
    }
  }
   */
  @tracked nickname = '';
  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked passwordConfirmation = '';
  @tracked isAuthenticating = false;
  @tracked errorMessage = '';

  @action
  updateNickname(event) {
    this.nickname = event.target.value;
  }

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  updatePasswordConfirmation(event) {
    this.passwordConfirmation = event.target.value;
  }

  @action
  async register(event) {
    event.preventDefault();

    // simple client-side validation for password confirmation
    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isAuthenticating = true;

    try {
      let account = this.store.createRecord('account', {
        nickname: this.nickname,
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });

      await account.save();

      console.log('Account saved successfully. Redirecting to login...');

      this.nickname = '';
      this.name = '';
      this.email = '';
      this.password = '';
      this.passwordConfirmation = '';

      this.router.transitionTo('session');
    } catch (err) {
      console.error('Registration error:', err);
      this.errorMessage = err.message || 'Registration failed.';
    } finally {
      this.isAuthenticating = false;
    }
  }
}
