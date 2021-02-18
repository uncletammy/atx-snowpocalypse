/**
 * Location.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    address: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    electricity: {
      type: 'boolean'
    },
    water: {
      type: 'boolean'
    },
    meta: {
      type: 'json',
      defaultsTo: {}
    },
    lat: {
      type: 'number'
    },
    lng: {
      type: 'number'
    },
    naughty: {
      type: 'boolean'
    }
  },

};

