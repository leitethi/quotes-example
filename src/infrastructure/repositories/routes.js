class Repository {
  constructor(cache) {
    this.cache = cache || {};
  }

  get(key) {
    return this.cache[key] ? this.cache[key] : null;
  }

  getKeys(prefix) {
    return Object.keys(this.cache).filter(key => key.startsWith(prefix));
  }

  set(key, value) {
    this.cache[key] = value;
  }

  clearAll() {
    this.cache = {};
  }
}

module.exports = new Repository();