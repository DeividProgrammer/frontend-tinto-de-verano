import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') email;
  @attr('string') accountName;

  @hasMany('group', { async: true, inverse: null }) groups;
}
