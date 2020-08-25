const router = require('koa-router')()
const controller = require('../controllers')

module.exports = (app) => {
  // router.Get()
  // app.user(router.routes())
  router.Post('/api/article/new', controller.createNewArticle)
  app.use(router.routes)
}
