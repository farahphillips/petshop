var m = require('mithril')
var Shop = require('../models/shop')
var Pets = require('../models/pets')
var Users = require('../models/users')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop([new Pets.model()])
  ctrl.users = m.prop(new Users.model())
  Shop.fetch().then(ctrl.shop)
  Pets.fetch().then(ctrl.pets)
  Users.fetch().then(ctrl.users)
}

PetShopWindow.view = function (ctrl) {
  return m('.pet-shop', [
    m('h1', "Welcome!" + ctrl.shop.name),
    userLogin(ctrl, ctrl.users()),
    ctrl.pets().map(function(pet, index){
      return m('.pet', [
        m('p', "Pet Name: " + pet.name),
        m('p', "Type of Species: " + pet.species),
        m('p', "Number of Likes: " + pet.likes.length),
        m("button[type=button]", "Like"),
        m('img', {"src": pet.imageUrl, "height": "300px", "width": "200px"})
      ])
    })
  ])
}

function userLogin (ctrl, user) {
  return m("form", [
    m("label", "UserName"),
       m("input", {onchange: m.withAttr("value", user.username), value: user.username()}),
       m("label", "Password"),
       m("input", {onchange: m.withAttr("value", user.password), value: user.password()}),
       m("button[type=button]", {onclick: Users.signup.bind(this, ctrl.users())}, "Sign Up"),
       m("button[type=button]", {onclick: Users.fetch.bind(this, ctrl.users())}, "Sign In")
  ])
}
