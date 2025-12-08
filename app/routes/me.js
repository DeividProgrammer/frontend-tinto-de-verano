import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class MeRoute extends Route {
  /*
  @service session;
  @service router;
  @service store;

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('session');
    }
  }

  async model() {
    const response = await RSVP.hash({
      user: this.store.findRecord('user', 'me'),

      counter: fetch('http://localhost:8888/me/counter', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.router.transitionTo('session');
        }
      }),
    });

    return response;
  }
  */
}

