import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  keyForAttribute(key) {
    // By default, Ember Data converts 'camelCase' to 'kebab-case'.
    // By returning the 'key' unchanged, we tell it not to do any conversion.
    // This way, 'accountName' in the model will map to 'accountName' in the JSON.
    return key;
  }
}

