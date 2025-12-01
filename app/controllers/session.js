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
      const response = await fetch('/api/session', {
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
              email: this.email,
              password: this.password,
            },
          },
        }),
      });

      if (!response.ok) {
        let errorText;
        try {
          const errorJson = await response.json();
          errorText = errorJson.errors?.[0]?.detail || response.statusText;
        } catch (parseError) {
          console.error('Error parseando respuesta de login:', parseError);
          errorText = response.statusText;
        }
        throw new Error(errorText || 'Error al iniciar sesión');
      }

      const data = await response.json();
      console.log('Login correcto, respuesta del servidor:', data);

      this.session.setSession(data.data);

      this.router.transitionTo('me');
    } catch (e) {
      console.error('Error en login:', e);
      this.errorMessage = e.message || 'No se pudo iniciar sesión (error de red)';
      this.password = '';
    } finally {
      this.isAuthenticating = false;
    }
  }
}
