import Model, { attr } from '@ember-data/model';

export default class LeaderboardEntryModel extends Model {
  @attr('number') rank;
  @attr('string') userUri;
  @attr('string') userName;
  @attr('number') count;
  @attr('string') period;

  get score() {
    return this.count;
  }
}
