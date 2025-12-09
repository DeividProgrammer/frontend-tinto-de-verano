import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MeRoute extends Route {
  @service weeklyCounter;

  async model() {
    try {
      const weeklyCount = await this.weeklyCounter.getWeeklyCount();

      return {
        count: weeklyCount.count,
        period: weeklyCount.period,
        error: null,
      };
    } catch (error) {
      console.error('Error loading weekly-count:', error);
      return {
        count: null,
        period: null,
        error: "The weekly-counter couldn't be loaded.",
      };
    }
  }
}
