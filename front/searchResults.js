const render = require('./render')
const searchbarHtml = require('./searchbar')
function getGivemanHtml(giveman){
  return `
  <li class="media">
    <img class="mr-3 rounded-circle img-fluid" src="${giveman.photo}" alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1"><a href="/pageProfil/${giveman.id}">${giveman.firstname} ${giveman.lastname}</a></h5>
      <p>${giveman.description}</p>
       </div>
  </li>
  `
}

function resultKeyword(keyword) {
  return "resultats pour " + keyword
}

function showResultForKeyword(keyword) {
  fetch(`/search-givemen?skill=${keyword}`)
  .then(response =>response.json())
  .then(givemen => {
    render(searchbarHtml + resultHtml(givemen))
  })
}

const resultHtml = givemen => `<ul class="list-unstyled">
  ${
    givemen.map(getGivemanHtml).join('\n')
  }
  </ul>
`

module.exports = showResultForKeyword
