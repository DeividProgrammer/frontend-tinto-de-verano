import Route from '@ember/routing/route';

export default class LeaderboardIndexRoute extends Route {
    model() {
        return this.modelFor('leaderboard');
    }
}
