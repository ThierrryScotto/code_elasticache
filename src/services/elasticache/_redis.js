//
// dependencies
const redis       = require('redis');
const { logger }  = require('common-api');

//
//  promisify
const { promisify } = require('util');

//
// const
const { ELASTICACHE_PRIMARY_ENDPOINT, NODE_ENV, ELASTICACHE_PORT } = process.env;

class ElastiCacheRedis {
  constructor(port) {
    this.elasticachePrimaryEndpoint = ELASTICACHE_PRIMARY_ENDPOINT;
    this.port                       = port || 6379;
    this.client                     = null;
    this.createClient();
  }

  createClient () {
    this.client = redis.createClient({
      host: this.elasticachePrimaryEndpoint,
      port: this.port
    });

    this.client.on('connect', function() {
      console.log('Redis client connected');
    });

    this.client.on('error', function (err) {
      console.log('Something went wrong ' + err);
    });

    return true;
  }
  
  async promiseFunction(nameOfFunction) {
    if (NODE_ENV === 'development' || NODE_ENV === 'local') return false;
    const newPromiseFunction = await promisify(nameOfFunction).bind(this.client);
    return newPromiseFunction;
  }

  async setJson(key, value, expire = 900) {
    if (value) {
      const setAsync = await this.promiseFunction(this.client.set);
      if (setAsync) {
        await setAsync(key, JSON.stringify(value));
        this.client.expire(key, expire);
      }
    }
  }
  
  async getJson(key) {
    const getAsync = await this.promiseFunction(this.client.get);
    if (getAsync) {
      const value = await getAsync(key);
      if (value) {
        logger.info('The data were researched on elasticache redis', `Key: ${key}` );
        return JSON.parse(value);
      }
    }

    return false;
  }

  async deleteObject(key) {
    const deleteAsync = await this.promiseFunction(this.client.del);
    if (deleteAsync) {
      return await deleteAsync(key);
    }

    return false;
  }
}

module.exports = new ElastiCacheRedis();