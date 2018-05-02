'use strict'

const searchbarHtml = require('./searchbar')
const showMyProfile = require('./myProfile')
const showPageProfil1 = require('./givemanProfile')
const showContacts = require('./messagerie')
const home = require('./showHome')



// Render
// const search = () => {
//   mainDiv.innerHTML = navbarHtml + searchPageHtml() + footerHtml
// }


// Fin render

const checkLoginMiddleware = (context, next) => {
  if (LoggedInUser === undefined){
    page('/')
  }
  next()
}

page("/", home)
page("/pagePerso",checkLoginMiddleware, showMyProfile)
page("/chat", checkLoginMiddleware, showContacts)
page("/pageProfil/:profilId", showPageProfil1)
page()
