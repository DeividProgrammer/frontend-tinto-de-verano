import Model, { attr } from '@ember-data/model';

export default class WeeklyCountModel extends Model {
  @attr('string') period;
  @attr('number') count;
}
