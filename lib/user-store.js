var modrain = require('raincatcher-modrain/lib/modrain');
var Promise = require('bluebird');
var _ = require('lodash');

//A simple in-memory store of objects describing users.

function DataSet(datasetName) {
  this.name = datasetName;
  this.data = [];
}

/**
 *
 * Creating An Element For This Data Set.
 *
 * @param elementToCreate
 * @returns {Promise}
 */
DataSet.prototype.create = function create(elementToCreate) {

  if (_.find(this.data, {name: elementToCreate.name})) {
    return Promise.reject(new Error("Element With Name " + elementToCreate.name + " Already Exists"));
  }

  this.data.push(elementToCreate);
  return Promise.resolve(elementToCreate);
};

/**
 *
 * Creating An Element For This Data Set.
 *
 * @returns {Promise}
 */
DataSet.prototype.list = function list() {
  return Promise.resolve(this.data);
};

modrain.registerModule('store.user', new DataSet('users'));