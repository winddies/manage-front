const url = require('url')
const getUserInfo = require('../service/user')
const store = require('../store/redis')

const redirectUrl = process.env.REDIRECT_URL

module.exports = async (ctx, next) => {
  console.log('start user verify')
  const result = url.parse(ctx.req.url, true)
  // 如果带有 token 则说明是从 sso 那里跳过来的，这时候可以去利用 token 拿用户信息
  if (result.query && result.query.token) {
    try {
      // 这里生成 sid，如果 token 有效则在 sso-api 里保存该 sid
      const userInfo = await getUserInfo(result.query.token, store.getSID())
      const data = JSON.parse(userInfo)
      ctx.session.value = data
      ctx.session.refresh()
      ctx.redirect(ctx.request.path)
      return
    } catch (e) {
      console.log(e)
      ctx.redirect(redirectUrl)
      return
    }
  }

  if (ctx.session.value) {
    next()
    return
  }
  console.log('login required')
  ctx.redirect(redirectUrl)
}
