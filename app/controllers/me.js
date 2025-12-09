import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeController extends Controller {
  @service weeklyCounter;

  @tracked weeklyCount = null;

  loadFromModel() {
    if (this.model && this.model.count != null) {
      this.weeklyCount = this.model.count;
    }
  }

  @action
  async increment() {
    console.log('increment clicked');
    try {
      const updated = await this.weeklyCounter.incrementWeeklyCount();
      this.weeklyCount = updated.count;
    } catch (e) {
      console.error('Error incrementing counter', e);
    }
  }

  @action
  async decrement() {
    console.log('decrement clicked');
    try {
      if (this.weeklyCounter.decrementWeeklyCount) {
        const updated = await this.weeklyCounter.decrementWeeklyCount();
        this.weeklyCount = updated.count;
      }
    } catch (e) {
      console.error('Error decrementing counter', e);
    }
  }
}
