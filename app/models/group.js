import Model, { attr } from '@ember-data/model';

export default class GroupModel extends Model {
  @attr('string') name;
  @attr('string') status;
}
