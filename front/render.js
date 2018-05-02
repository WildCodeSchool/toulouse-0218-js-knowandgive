const navbarHtml = require('./navbarGuest')
const navbarBisHtml = require('./navbarConnected')
const footerHtml = require('./footer')
const mainDiv = document.getElementById('main')

function removeBackdrops() {
  const backdrops = document.getElementsByClassName('modal-backdrop')
  if (backdrops.length > 0) {
    document.body.removeChild(backdrops[0])
  }
  document.body.classList.remove('modal-open')
}

module.exports = mainHTML => {
  const navBar = LoggedInUser === undefined ? navbarHtml : navbarBisHtml
  mainDiv.innerHTML = navBar+ mainHTML + footerHtml
  removeBackdrops()
}
