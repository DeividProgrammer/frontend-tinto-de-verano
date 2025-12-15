import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class GroupsRoute extends Route {
  @service groups;
  @service session;

  async model() {
    try {
      const groupsList = await this.groups.getGroups();
      console.log('Groups list:', groupsList);
      const currentUser = await this.session.getMe();

      return {
        groups: groupsList,
        error: null,
      };
    } catch (error) {
      console.error('Error loading data for groups route:', error);
      return {
        groups: [],
        error: "The groups or user info couldn't be loaded.",
      };
    }
  }
  actions = {
    refreshRoute() {
      this.refresh();
    },
  };
}
