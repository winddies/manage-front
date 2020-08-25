const Redis = require('ioredis')
const { Store } = require('koa-session2')


class RedisStore extends Store {
  constructor(config) {
    super()
    this.redis = new Redis(config)
    this.sid = ''
  }

  async get(sid, _) {
    let data = await this.redis.get(sid + process.env.SESSION_SECRET)
    return { value: JSON.parse(data) }
  }

  getSID() {
    const sid = this.getID(24)
    return this.sid || sid
  }

  setSID() {
    this.sid = this.getID(24)
  }

  resetSID() {
    this.sid = ''
  }

  async set(session, { sid =  this.getSID(), maxAge = 1000000 } = {}, ctx) {
    try {
        // Use redis set EX to automatically drop expired sessions
      await this.redis.set(sid + process.env.SESSION_SECRET, JSON.stringify(session.value), 'EX', maxAge / 1000)
      const result = url.parse(ctx.req.url, true)
      if (result.query && result.query.token) {
        this.resetSID()
      }
    } catch (e) {}
    return sid
  }

  async destroy(sid, _) {
    return await this.redis.del(sid)
  }
}

const redisConfig = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_ADDR,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
  family: 4
}

const store = new RedisStore(redisConfig)

module.exports = store
