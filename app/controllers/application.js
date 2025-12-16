import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service router;
  @service session;
  @service store;

  @tracked isGroupsMenuOpen = false;

  get showNavbar() {
    return this.router.currentRouteName !== 'session' && this.router.currentRouteName !== 'register';
  }

  @action
  async logout() {
    await this.session.invalidate();
    this.router.transitionTo('session');
  }

  @action
  goToMyGroups() {
    this.router.transitionTo('groups');
  }

  @action
  goToLeaderboard() {
    this.router.transitionTo('leaderboard');
  }
}
