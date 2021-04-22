const IATA = require('../../../src/domain/entities/iata');

describe('IATA Entity Tests', () => {
  it('can create an iata', () => {
    const fakeIata = 'XPTO';

    const iata = new IATA({ code: fakeIata });

    expect(iata.code).toEqual(fakeIata);
    expect(iata.routes).toHaveLength(0);
  });

  it('can assign routes to iata', () => {
    const fakeIata = 'XPTO';
    const fakeIata2 = '666';

    const from = new IATA({ code: fakeIata });
    const to = new IATA({ code: fakeIata2 });

    from.addRoutes({ iata: to, price: 100 });

    expect(from.routes).toHaveLength(1);
    expect(from.routes[0].origin).toEqual(from);
    expect(from.routes[0].destination).toEqual(to);
    expect(from.routes[0].price).toEqual(100);
  });
});
