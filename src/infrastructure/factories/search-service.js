const createRequestHandler = require('../services/request-handler');
const SearchService = require('../../domain/services/route-service');
const repository = require('../repositories/routes');

module.exports = class SearchServiceFactory {
  static create(action) {
    return createRequestHandler(new SearchService({ repository }), action);
  }
};
