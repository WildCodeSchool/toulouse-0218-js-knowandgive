const render = require('./render')
const searchbarHtml = require('./searchbar')
const competencesHtml = require('./competencesPrincipales')
const charteGivemanHtml = require('./charteGiveman')
const presentationHtml = require('./presentationVideo')
const showResultForKeyword = require('./searchResults')
// const searchFormEvents = require('./searchFormEvents')

module.exports = () => {
  render(searchbarHtml + presentationHtml + competencesHtml + charteGivemanHtml)
  const autocompleteInput = document.getElementById("myInput")
  const searchForm = document.getElementById("search-form")
  console.log(searchForm)
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    showResultForKeyword(autocompleteInput.value)
  })

  // var skill = ["Jardinage", "Famille", "Decoration", "Cuisine", "Art", "Enseignement", "Bricolage", "Mode et beauté"];
    /* FIN DE LA PARTIE MOTS CLEFS */
    console.log(skills)
  autocomplete(autocompleteInput, skills);
}
