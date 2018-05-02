const render = require('./render')
const searchbarHtml = require('./searchbar')
const competencesHtml = require('./competencesPrincipales')
const charteGivemanHtml = require('./charteGiveman')
const presentationHtml = require('./presentationVideo')
const showResultForKeyword = require('./searchResults')
module.exports = () => {
  render(searchbarHtml + presentationHtml + competencesHtml + charteGivemanHtml)
  const autocompleteInput = document.getElementById("myInput")
  const searchForm = document.getElementById("search-form")
  console.log(searchForm)
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    showResultForKeyword(autocompleteInput.value)
  })

  var skill = ["Jardinage", "Famille", "Decoration", "Cuisine", "Art", "Enseignement", "Bricolage", "Mode et beauté"];
    /* FIN DE LA PARTIE MOTS CLEFS */

  autocomplete(autocompleteInput, skill);

  if (LoggedInUser) {
    return
  }

  const connexion = document.getElementById('form-post')
  connexion.addEventListener('submit', event => {

    event.preventDefault()
    const inputs = connexion.getElementsByTagName('input')
    let data = {}
    for (let input of inputs) {
      if (input.name !== '') {
       data[input.name] = input.value
      }
    }

    const dataJSON = JSON.stringify(data)

    fetch('/connexion', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: dataJSON
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      }
      else {
        LoggedInUser = data
        page(window.location.pathname)
      }
      console.log(data)
    })
  })

    const createAccount = document.getElementById('form-account')
    console.log(createAccount)
    createAccount.addEventListener('submit', event => {

      event.preventDefault()
      const inputsForm = createAccount.getElementsByTagName('input')
      let accountData = {}
      for (let input of inputsForm) {
        if (input.name !== '') {
            accountData[input.name] = input.value
        }
        if (input.value === '') {
          return alert('Veuillez renseigner tous les champs')
        }
      }

      if ((accountData.email !== accountData.confirmEmail) || (accountData.password !== accountData.confirmPassword)) {
        alert('Mot de passe ou email de confirmation incorrect')
      }

      const accountDataJSON = JSON.stringify(accountData)


      fetch('/create-account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: accountDataJSON
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        }
        else {
          LoggedInUser = data
          page('/pagePerso')
        }
        console.log(accountData)
      })
  })
}
