import EmberRouter from '@ember/routing/router';
import config from 'frontend-tinto-verano/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('session');
  this.route('groups', function () {
    this.route('group', function () {
      this.route('leaderboard');
    });
  });
  this.route('me');
  this.route('register');
  this.route('manage-groups');
  this.route('leaderboard', function () {
    this.route('detail', { path: '/:group_id' });
  });
});
