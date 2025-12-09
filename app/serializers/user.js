import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (
      requestType === 'queryRecord' &&
      payload.data &&
      payload.data.id === undefined
    ) {
      payload.data.id = 'me';
    }

    return super.normalizeResponse(...arguments);
  }
}

