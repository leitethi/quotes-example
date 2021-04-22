module.exports = class IATA {
  constructor({ code }) {
    this.code = code;
    this.routes = [];
  }

  addRoutes({ iata, price }) {
    this.routes.push({ origin: this, price, destination: iata });
  }

  findRoutes(iata) {
    const routes = [];

    const directRoute = this.findRoute(iata);

    if (directRoute) {
      routes.push([directRoute]);
    }

    this.routes.forEach(route => {
      const connections = [route];

      this.findConnections(route.destination, iata, connections);

      routes.push(connections);
    });

    return routes
      .filter(connection => connection.some(route => route.destination.code === iata));
  }

  findConnections (current, destination, connections) {
    current.routes.forEach(route => {
      connections.push(route);

      if (route.destination.code === destination) {        
        return connections;
      }

      return this.findConnections(route.destination, destination, connections);
    });
  }

  findRoute(iata) {
    return this.routes.find(route => route.destination.code === iata);
  }
}
