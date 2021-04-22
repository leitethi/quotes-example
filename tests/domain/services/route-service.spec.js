const repository = require('../../../src/infrastructure/repositories/routes');
const SearchService = require('../../../src/domain/services/route-service');
const messages = require('../../../src/domain/messages');

describe('Search Service Tests', () => {
  const searchService = new SearchService({ repository });

  it('returns not found message for an unknown route', (done) => {
    const unknownIata = 'xpto';
  
    const result = searchService.search(unknownIata, unknownIata);
  
    expect(result).toEqual(messages.route.notFound);
    done();
  });

  it('returns an existing route', (done) => {  
    searchService.index([{ from: 'GRU', to: 'SCL', price: 15 }]);

    const result = searchService.search({ from: 'GRU', to: 'SCL' });

    expect(result).toBeDefined();
    expect(result.price).toEqual(15);
    expect(result.route).toEqual('GRU,SCL');
    done();
  });

  it('returns an existing route with best price considering connections', (done) => {
    searchService.index([{
      from: 'GRU',
      to: 'SCL',
      price: 18,
    }, {
      from: 'GRU',
      to: 'BRC',
      price: 10,
    }, {
      from: 'BRC',
      to: 'SCL',
      price: 5,
    }]);

    const result = searchService.search({ from: 'GRU', to: 'SCL' });

    expect(result).toBeDefined();
    expect(result.route).toEqual('GRU,BRC,SCL');
    expect(result.price).toEqual(15);
    done();
  });

  it('can search routes with more than one connections', (done) => {
    searchService.index([{
      from: 'GRU',
      to: 'ORL',
      price: 20,
    }, {
      from: 'ORL',
      to: 'CDG',
      price: 5,
    }, {
      from: 'CDG',
      to: 'SCL',
      price: 5,
    }]);

    const result = searchService.search({ from: 'GRU', to: 'SCL' });

    expect(result.route).toEqual('GRU,ORL,CDG,SCL');
    expect(result.price).toEqual(30);
    done();
  });
});
