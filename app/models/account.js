import Model, { attr } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string') nickname;
  @attr('string') name;
  @attr('string') email;
  @attr('string') password;
  @attr('string') passwordConfirmation;
}
