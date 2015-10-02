var m = require('mithril')

var Users = module.exports = {}

Users.model = function(data) {
  data = data || {}
  this.username = m.prop(data.username);
  this.password = m.prop(data.password);
}

Users.fetch = function (user, pass) {
    return m.request({ method: 'POST', url: 'http://pet-shop.api.mks.io/signin', data: user})
}

Users.signup = function (user, pass) {
    return m.request({ method: 'POST', url: 'http://pet-shop.api.mks.io/signup', data: user})
}