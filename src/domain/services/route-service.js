const IATA = require('../entities/iata');
const messages = require('../messages');

module.exports = class SearchService {
  constructor({ repository }) {
    this.repository = repository;
  }

  getOrCreateIata(code) {
    const data = this.repository.get(code);

    if (!data) {
      this.repository.set(code, new IATA({ code }));
    }
  
    return this.repository.get(code);
  }

  save(route) {
    const from = this.getOrCreateIata(route.from);
    const to = this.getOrCreateIata(route.to);

    from.addRoutes({ iata: to, price: route.price });

    return messages.route.success;
  }

  index(routes) {
    this.repository.clearAll();

    routes.forEach(route => this.save(route));
  }
  
  search({ from, to }) {
    const origin = this.repository.get(from);
    const destination = this.repository.get(to);

    if (!origin || !destination) return messages.route.notFound;

    const results = origin.findRoutes(to)
      .map(route => route.reduce((prev, curr) => {
        return {
          price: prev.price + curr.price, route: `${prev.route},${curr.destination.code}`,
        }
      }, {
        route: from,
        price: 0,
      }))
      .sort((a, b) => a.price - b.price);

    const [result] = results;
  
    return { ...messages.route.success, ...result };
  }
};
