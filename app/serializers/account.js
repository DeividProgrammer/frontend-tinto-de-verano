import ApplicationSerializer from './application';

export default class AccountSerializer extends ApplicationSerializer {
    keyForAttribute(key) {
        if (key === 'passwordConfirmation') {
            return 'password-confirmation';
        }
        return super.keyForAttribute(key);
    }
}
