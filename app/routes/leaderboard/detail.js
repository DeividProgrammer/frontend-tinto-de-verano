import Route from '@ember/routing/route';

export default class LeaderboardDetailRoute extends Route {
    async model(params) {
        let { leaderboards } = this.modelFor('leaderboard');
        return leaderboards?.find((l) => l.groupId === params.group_id);
    }
}
