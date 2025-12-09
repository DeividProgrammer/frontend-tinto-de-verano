import Service, { service } from '@ember/service';

export default class WeeklyCounterService extends Service {
  @service store;

  async getWeeklyCount() {
    const weeklyCounts = await this.store.queryRecord('weekly-count', {});
    return {
      id: weeklyCounts.id,
      period: weeklyCounts.period,
      count: weeklyCounts.count,
    };
  }

  async incrementWeeklyCount() {
    const updatedWeeklyCount = await this.store.queryRecord('weekly-count', {
      action: 'increment',
    });

    return {
      id: updatedWeeklyCount.id,
      period: updatedWeeklyCount.period,
      count: updatedWeeklyCount.count,
    };
  }

  async decrementWeeklyCount() {
    const updatedWeeklyCount = await this.store.queryRecord('weekly-count', {
      action: 'decrement',
    });

    return {
      id: updatedWeeklyCount.id,
      period: updatedWeeklyCount.period,
      count: updatedWeeklyCount.count,
    };
  }
}
