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

function setEventListeners (){
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
      console.log(dataJSON)
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



module.exports = mainHTML => {
  let navBar
   if (LoggedInUser === undefined) {
     navBar = navbarHtml
   }
   else {
     navBar = navbarBisHtml
   }

  mainDiv.innerHTML = navBar+ mainHTML + footerHtml

  if (LoggedInUser === undefined) {
    setEventListeners ()
  }
  removeBackdrops()
}
