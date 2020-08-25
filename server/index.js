const dotenv = require("dotenv")
dotenv.config()

const consola = require('consola')

const { Nuxt, Builder } = require('nuxt')

const session = require('koa-session2')

const cors = require('koa2-cors')

const userVerify = require('./middleware/loginCheck')

const store = require('./store/redis')

const Koa = require('koa')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')


config.dev = app.env !== 'production'

async function start () {
  console.log('start come')
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3001
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(session({
    store,
    key: process.env.SESSION_KEY,
    maxAge: 1*60*60*1000
  }))

  app.use(cors())

  // 如果带有 token 则去校验 token 有效性并且设置 session 值
  // 如果 token 过期则重定向到 sso 登陆页
  app.use(async (ctx, next) => await userVerify(ctx, next))

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
