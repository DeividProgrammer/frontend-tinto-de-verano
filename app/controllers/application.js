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
  logout() {
    this.session.clearSession();
    this.store.unloadAll();
    this.router.transitionTo('session');
  }

  @action
  toggleGroupsMenu() {
    this.isGroupsMenuOpen = !this.isGroupsMenuOpen;
  }

  @action
  closeGroupsMenu() {
    this.isGroupsMenuOpen = false;
  }

  @action
  goToMyGroups() {
    this.closeGroupsMenu();
    this.router.transitionTo('groups');
  }

  @action
  goToJoinGroups() {
    this.closeGroupsMenu();
    this.router.transitionTo('groups');
  }
}
