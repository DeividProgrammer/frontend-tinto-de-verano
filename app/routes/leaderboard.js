import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LeaderboardRoute extends Route {
  @service leaderboard;
  @service session;

  async model() {
    try {
      let user = this.session.currentSession;

      // If user is missing or is just a plain object (no async relationship helper), reload it
      if (!user || !user.groups || typeof user.groups.then !== 'function') {
        user = await this.session.getMe();
      }

      const leaderboardsData = await this.leaderboard.getLeaderboards(user);
      return {
        leaderboards: leaderboardsData,
        error: null,
      };
    } catch (error) {
      console.error('Error in Leaderboard route:', error);
      return {
        leaderboards: [],
        error: 'Could not load leaderboards.',
      };
    }
  }
}
