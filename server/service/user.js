const request = require('request')
const querystring = require('query-string')

// TODO: 关于 sso 的地址应该放到 config 里去读取
const ssoVerifyUrl = process.env.SSOVERIFY
// 本服务的退出地址，虽然我们有统一的登录，但是要有不同的退出
const logoutUrl = process.env.LOGOUT

module.exports = function getUserInfo(token, sid) {
  return new Promise((resolve, reject) => {
    const params = {
      tokenId: token,
      localSessionId: sid,
      logoutUrl
    }
    // const options = {
    //   url: `${ssoVerifyUrl}?${querystring(params)}`
    // }
    request.get(`${ssoVerifyUrl}?${querystring.stringify(params)}`, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
}
