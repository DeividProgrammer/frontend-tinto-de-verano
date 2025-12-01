import Model, { attr, belongsTo } from '@ember-data/model';

export default class LeaderboardEntryModel extends Model {
  @belongsTo('user', { async: false, inverse: null }) user;
  @attr('number') score;
  @attr('string') period;
}
