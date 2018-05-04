/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const navbarHtml = __webpack_require__(4)
const navbarBisHtml = __webpack_require__(5)
const footerHtml = __webpack_require__(6)
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = /* @html */ `<div class="row position">
      <img src="/img/banniere-know-and-give.png" alt="imageSearch" width="99%" class="banniere-intro img-fluid"/>
      <div id="searchbar">
        <form id="search-form" action="#" class="formulaire">
          <div class="autocomplete">
            <!-- <input class="champ" type="text" value="Search(...)"/> -->
            <input id="myInput" type="text" name="Skill" placeholder="Compétences">
            <input class="bouton-recherche" type="submit" value="Je recherche" />
          </div>
        </form>
      </div>
    </div>
`


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const searchbarHtml = __webpack_require__(1)
const showMyProfile = __webpack_require__(3)
const showPageProfil1 = __webpack_require__(7)
const showContacts = __webpack_require__(8)
const home = __webpack_require__(9)



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
page("/messagerie", checkLoginMiddleware, showContacts)
page("/pageProfil/:profilId", showPageProfil1)
page()


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(0)

function getContactInformations(infosPerso){
  return `
      <form id="formProfile" action="/informations-personnelles" method="POST">
          <div class="form-group row">
              <label for="lastname" class="col-sm-4 col-form-label">Nom :</label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Votre nom" value="${infosPerso.lastname}">
              </div>
          </div>
          <div class="form-group row">
              <label for="fisrtname" class="col-sm-4 col-form-label">Prénom :</label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Votre prénom" value="${infosPerso.firstname}">
              </div>
          </div>
          <div class="form-group row">
              <label for="postal" class="col-sm-4 col-form-label">Code postal :</label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="postal" name="zipCode" value="${infosPerso.zipCode}">
              </div>
          </div>
          <div class="form-group row">
              <label for="city" class="col-sm-4 col-form-label">Ville :</label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="city" name="city" value="${infosPerso.city}">
              </div>
          </div>
          <div class="form-group row">
              <label for="email" class="col-sm-4 col-form-label">Email : </label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="email" name="email" value="${infosPerso.email}">
              </div>
          </div>
          <div class="form-group row">
              <label for="linkedin" class="col-sm-4 col-form-label">Linkedin : </label>
              <div class="col-sm-6">
                  <input type="text" class="form-control" id="linkedin" name="linkedin" value="${infosPerso.linkedin}">
              </div>
          </div>
       </form>
  `
}

function getDescription(infosPerso){
  return `
<div class="form-group description">
    <h2>Description</h2>
     <form id="formDescription" method="POST" action="/description">
       <textarea class="form-control" rows="7" placeholder="Présentez-vous pour faciliter le partage ! Encore mieux, vous pouvez ici préciser vos attentes." id="description" name="description">${infosPerso.description}</textarea>
     </form>
   <input form="formDescription" type="submit" class="btn btn-primary" value="Mettre à jour ma description">
</div>`
}


function getSkill(skill){
  return `<span class="badge badge-pill badge-success">${skill}</span>`
}


const pagePersoHtml = infosPerso => /* @html */ `

       <h1>Informations personnelles</h1>
       <div class="container" id="formInfo">
           <div class="row contactInfo">
               <div class="col-md-6 imgProfil">
                 <img src="images/${infosPerso.photo}" alt="photo de profil" width="40%">

                   <!-- Upload de la photo -->
                   <form method="POST" id="file-form" enctype="multipart/form-data" action="/uploaddufichier">
                      <input type="file" id="file-select" name="monfichier">
                        <button id="upload-button"> envoyer </button>
                   </form>
                   <!-- fin Upload photo -->
               </div>
               <div class="col-md-6 contactInformations">
                 <h2>Coordonnées</h4>
                   <div class="card">
                     <div class="card-header">A propos de moi</div>
                      <div class="card-body">

                     ${getContactInformations(infosPerso)}

                     </div>
                   </div>
                   <input form="formProfile" type="submit" class="btn btn-primary formProfileButton" value="Mettre à jour mes coordonnées">
               </div>
           </div>
           <div class="row">
               <div class="col-md-6">
                 ${getDescription(infosPerso)}
               </div>

               <div class="col-md-6">
                  <div class="form-group skills">
                   <h2>Compétences</h2>
                   ${infosPerso.skill.map(getSkill).join('')}

                     <br />
                     <form id="formSkill" method="POST" action="/competences">
                       <input type="text" class="form-control" id="competence" name="competence">
                     </form>
                   <input form="formSkill" type="submit" class="btn btn-primary" value="Valider une compétence">
                </div>
              </div>
           </div>
       </div>
`
module.exports = () => {
  console.log('Page perso', LoggedInUser)
  render(pagePersoHtml(LoggedInUser))

  const fileForm = document.getElementById('file-form');
  const fileSelect = document.getElementById('file-select');
  const uploadButton = document.getElementById('upload-button');
  fileForm.addEventListener('submit', event => {
    event.preventDefault()
    uploadButton.innerHTML = 'Uploading...'
    const files = fileSelect.files
    const formData = new FormData()
    for (let file of files) {
      if (!file.type.match('image.*')) {
        continue
      }
      formData.append('monfichier', file, file.name)
    }
    fetch('/uploaddufichier', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': ''
      },
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  })
  console.log('page perso')


// Entrée de compétences
  const competences = document.getElementById('formSkill')
  competences.addEventListener('submit', event => {
    event.preventDefault()
    const inputs = competences.getElementsByTagName('input')
    let skillData = {}
    for (let input of inputs) {
      if (input.name !== '') {
       skillData[input.name] = input.value
      }
    }

    const skillDataJSON = JSON.stringify(skillData)

    fetch('/competences', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: skillDataJSON
    })
    .then(response => response.json())
    .then(user => {
      LoggedInUser = user
      console.log(user)
      })

  })


// Entrée d'informations personnelles
  const informations = document.getElementById('formProfile')
  informations.addEventListener('submit', event => {
    event.preventDefault()
    const inputs = informations.getElementsByTagName('input')
    let infoData = {}
    for (let input of inputs) {
      if (input.name !== '') {
       infoData[input.name] = input.value
      }
    }

    const infoDataJSON = JSON.stringify(infoData)

    fetch('/informations-personnelles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: infoDataJSON
    })
    .then(response => response.json())
    .then(user => {
      LoggedInUser = user
      console.log(user)
      })
    })

// Entrer description
  const description = document.getElementById('formDescription')
  description.addEventListener('submit', event => {
    event.preventDefault()
    const champs = description.getElementsByClassName('form-control')
    let descriptionData = {}
    for (let input of champs) {
      if (input.name !== '') {
       descriptionData[input.name] = input.value
      }
    }

    const descriptionDataJSON = JSON.stringify(descriptionData)

    fetch('/description', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: descriptionDataJSON
    })
    .then(response => response.json())
    .then(user => {
      LoggedInUser = user
      // page('/pagePerso')
      console.log(user)
      })

    })
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = /* @html */ `
  <nav class="navbar navbar-expand-sm bg-custom">
      <img class="logo" src="/img/logo.png">
      <a class="navbar-brand" href="/">Know & Give</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto">
            <div class="navbar-nav">
              <button type="button" class="btn btn-nav" data-toggle="modal" data-target="#myModal">S'inscrire </button>
              <!-- Modal -->
              <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Bienvenue dans la communauté des GiveMen</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form id="form-account" method="POST" action="/create-account">
                       <div class="form-group row">
                           <label for="identifiant" class="col-sm-4 col-form-label">Identifiant :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="username" name="username">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="mdp" class="col-sm-4 col-form-label">Mot de passe :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="password" name="password">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="mdp" class="col-sm-4 col-form-label">Confirmer mot de passe :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="confirmPassword" name="confirmPassword">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="email" class="col-sm-4 col-form-label">Email :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="email" name="email">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="email" class="col-sm-4 col-form-label">Confirmer Email : </label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="confirmEmail" name="confirmEmail">
                           </div>
                       </div>
                    </div>
                  </form>
                    <div class="modal-footer">
                        <input form="form-account" type="submit" class="btn btn-primary" value="Valider">
                    </div>
                  </div>
                </div>
              </div>


              <button type="button" class="btn btn-nav" data-toggle="modal" data-target="#exampleModal">Connexion  </button>


              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Connexion</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body">

                      <form id="form-post" method="POST" action="/connexion">
                        <div class="form-group row">
                          <label for="identifiant" class="col-sm-4 col-form-label"><i class="fa fa-user"> </i> Identifiant</label>
                          <div class="col-sm-6">
                            <input type="text" class="form-control" id="userConnection" name="userConnection">
                          </div>
                        </div>

                    <div class="form-group row">
                      <label for="motDePasse" class="col-sm-4 col-form-label"><i class="fa fa-key"> </i> Mot de passe</label>
                      <div class="col-sm-6">
                          <input type="text" class="form-control" id="passwordConnection" name="passwordConnection">
                      </div>
                    </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                        <input form="form-post" type="submit" class="btn btn-primary" value="Valider" />
                    </div>
                  </div>
                </ul>
      </div>
  </nav>
`


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = /* @html */ `
<nav class="navbar navbar-expand-lg">
    <img class="logo" src="/img/logo.png">
    <a class="navbar-brand" href="/">Know & Give</a>
    <div class="collapse navbar-collapse" id="icons-position">
      <div class="icons">
        <ul class="navbar-nav mr-auto">
            <a href="/messagerie"><span class="icon-envelop fa-1x"></span></a>
            <a href="/pagePerso"><span class="icon-user fa-1x"></span></a>
            <a href="/logout"><span class="icon-switch fa-1x"></span></a>
        </ul>
      </div>
    </div>
</nav>
`


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = /* @html */ `<footer class="footer">
    <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="icones-footer">
            <ul class="nav footer-align">
                <li class="nav-item"><a href="https://www.facebook.com/wildcodeschool/" target="_blank" class="nav-link"><img src="/img/facebook.png" alt="facebook" width="13px"></a></li>
                <li class="nav-item"><a href="https://twitter.com/wildcodeschool?lang=en" target="_blank" class="nav-link"><img src="/img/instagram.png" alt="instagram" width="35px"></a></li>
                <li class="nav-item"><a href="https://www.instagram.com/wildcodeschool/" target="_blank" class="nav-link"><img src="/img/twitter.png" alt="twitter" width="30px"></a></li>
            </ul>
            <br>
          </div>
        </div>
        <p>By Thomas, Yvan, Alexandre & Vanthika - Etudiants de la <a href="https://wildcodeschool.fr/" target="_blank">Wild Code School</a></p>
    </div>
  </footer>
`


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(0)
function getProfilHtml(informations) {
  return `<div class="col-md-2">
    <img src="/images/${informations.photo}" alt="portrait" class="img-fluid"><br/>
    <a href="/messagerie?contactId=${informations.id}" class="btn btn-primary">Contacter</a>
  </div>
  <div class="col-md-10 skills">
    <h2 class="profil">A propos de moi</h2>

    <p class="nom">
    <b>${informations.firstname} ${informations.lastname}</b></p>
    <p>${informations.description}</br></p>
    <p>
    Code postal: ${informations.zipCode}<br />
    Ville: ${informations.city}<br />
    Email: ${informations.email}<br />
    Linkedin: ${informations.linkedin}</p>`
}

function getSkillBadge(skill) {
  return `<span class="badge badge-pill">
    ${skill}
  </span>`
}

const pageProfilHtml = informations => /* @html */ `
  <div class="container-fluid givemanProfile">
    <h1>Bienvenue sur ma page</h1>
    <div class="row">
        <div class="offset-1 col-md-2 offset-0">
          <img src="" alt="portrait" class=""><br/>
          <a href="/messagerie?contactId=${informations.id}" class="btn btn-primary">Contacter</a>
        </div>
        <div class="offset-1 col-md-7 offset-1 skills">

          ${getProfilHtml(informations)}

          <h2 class="profil">Mes compétences</h2>

          ${informations.skills.map(getSkillBadge).join('')}

        </div>
      </div>
  </div>
`
// début test navigation thomas //
module.exports = context => {
  console.log(context)
  const profilId = context.params.profilId
  fetch(`/getProfileData/${profilId}`)
  .then(response => response.json())
  .then(infosProfil => {
    const profilHtml = pageProfilHtml(infosProfil)
    render(profilHtml)
  })
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
}
// Fin test navigation thomas //


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(0)
// test //
function getContactHTML(contact) {
  return `
  <div class="contact">
    <div class="card-body">
      <h4 class="card-text"  data-id="${contact.id}" >${contact.firstname} ${contact.lastname}</h4>
    </div>
  </div>
  `
}



const contactHtml = contacts => /* @html */ `
<div class="container">
  <div class="row">
    <div class="col-md-3">
      <div class="contacts">
        <div class="card">
          ${
            contacts.map(getContactHTML).join('\n')
          }
        </div>
      </div>
    </div>
    <div class="col-md-9 messagerie" id="messages">
    </div>
  </div>
</div>
`

function getMessageHTML(message) {

  let offset = (LoggedInUser.id == message.senderId) ? "'col-md-3 offset-md-6'" : "'col-md-4'"
  let statut = (LoggedInUser.id== message.senderId) ? "envoie" : "recu"

  return /* @html */`
  <div class="row row-messagerie">
    <div class= ${offset}>
      <div class="card-recu">
        <div class= ${statut}>
          <div class="card-body">
            <p class="card-text">
              ${message.message}
            </p>
            <span class="time-left">${message.dateTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}
const messagesHTML = messages => /* @html */`
  <div id="liste-messages" class="contenu-message">
      ${
        messages.map(getMessageHTML).join('\n')
      }
  </div>
    <form id="sendMessage">
    <input class="chat-input" required></input>
    <input type="submit" value="Send" class="message-send" />
  </form>
`






module.exports = (context) => {
  let recipientId
  const search = context.querystring.split("=")
  console.log(search)
  const contactId = search.pop()
  let url = '/messagerie/people'
  if(contactId) {
    url += `?contactId=${contactId}`
  }

  // 1. Récupération des données depuis le serveur
  fetch(url, {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(contacts => {

    // 2. Affichage
    console.log(contactHtml(contacts))
    render(contactHtml(contacts))

    // 3. Mise en place des gestionnaires d'évènements

    const divAllContacts = document.getElementsByClassName('contacts')
    const h4InContacts = divAllContacts[0].getElementsByTagName('h4')


    for( let div of h4InContacts) {
      div.addEventListener('click', function (event) {
        console.log(event.target.dataset.id)
        event.target.classList.add('active')
        recipientId = event.target.dataset.id
        fetch(`/messagerie/messages/${event.target.dataset.id}`, {
          credentials: 'include'
        })
        .then(response => response.json())
        .then(messages => {
          const divMessages = document.getElementById('messages')
          divMessages.innerHTML = messagesHTML(messages)
          const listeMessages = document.getElementById('liste-messages')

          const formSendMessage = document.getElementById('sendMessage')
          formSendMessage.addEventListener('submit', function (event) {
            event.preventDefault()
            const input = formSendMessage.getElementsByTagName('input')[0]

            console.log(input.value)
            const data = {message: input.value, recipientId: recipientId}
            input.value = ''

            fetch('/messagerie', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(message => {
              listeMessages.innerHTML += getMessageHTML(message)
            })
          })
        })
      })
    }
  })
}
//FIn de test //


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(0)
const searchbarHtml = __webpack_require__(1)
const competencesHtml = __webpack_require__(10)
const charteGivemanHtml = __webpack_require__(11)
const presentationHtml = __webpack_require__(12)
const showResultForKeyword = __webpack_require__(13)
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
  //   /* FIN DE LA PARTIE MOTS CLEFS */
  //
  // autocomplete(autocompleteInput, skill);

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = /* @html */ `<div class="competences">
      <h3>Les <b>domaines</b> les plus <b>populaires</b></h3>
      <div class = "row items">
      <div class = "col-md-3">
        <img src="img/bricolage.png" alt="vignette bricolage" width="25%"><br>
        <h4>Bricolage</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/decoration.png" alt="vignette Décoration" width="25%"><br>
        <h4>Décoration</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/enseignement.png" alt="vignette Enseignement" width="25%"><br>
        <h4>Enseignement</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/cuisine.png" alt="vignette Cuisine" width="25%"><br>
        <h4>Cuisine</h4>
      </div>
    </div>
    <div class = "row items">
      <div class = "col-md-3">
        <img src="img/mode-et-beauté.png" alt="vignette Mode_et_beauté" width="25%"><br>
        <h4>Mode et beauté</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/art.png" alt="vignette Art" width="25%"><br>
        <h4>Art</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/famille.png" alt="vignette Famille" width="25%"><br>
        <h4>Famille</h4>
      </div>
      <div class = "col-md-3">
        <img src="img/jardinerie.png" alt="vignette Jardinerie" width="25%"><br>
        <h4>Jardinerie</h4>
      </div>
    </div>
  </div>
`


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = /* @html */ `<div class="giveman">
        <h3>Un <b>giveman</b> , qu'est ce que c'est ?</h3>
          <ul>
            <li class="valeur2"><img src="img/giveman.png" alt="vignette valeur 2" width="3%">Un giveman a le <b>coeur</b> sur la main.</li>
            <li class="valeur3"><img src="img/giveman.png" alt="vignette valeur 3" width="3%">Un giveman aime <b>donner</b> et <b>recevoir</b>.</li>
            <li class="valeur4"><img src="img/giveman.png" alt="vignette valeur 4" width="3%">Un giveman appartient à une <b>communauté</b> de <b>partage</b> et d'<b>entraide</b>.</li>
            <li class="valeur5"><img src="img/giveman.png" alt="vignette valeur 5" width="3%">Un giveman est <b>curieux</b> et à l'affut de nouvelles connaissances.</li>
          </ul>
          <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            <img src="img/giveman.png" alt="giveman" width="10%">
            Toi aussi, deviens un giveman !
            <img src="img/giveman.png" alt="giveman" width="10%">
          </button>
          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Bienvenue dans la communauté des GiveMen</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="form-account" method="POST" action="/create-account">
                   <div class="form-group row">
                       <label for="identifiant" class="col-sm-4 col-form-label">Identifiant :</label>
                       <div class="col-sm-6">
                           <input type="text" class="form-control" id="username" name="username">
                       </div>
                   </div>
                   <div class="form-group row">
                       <label for="mdp" class="col-sm-4 col-form-label">Mot de passe :</label>
                       <div class="col-sm-6">
                           <input type="text" class="form-control" id="password" name="password">
                       </div>
                   </div>
                   <div class="form-group row">
                       <label for="mdp" class="col-sm-4 col-form-label">Confirmer mot de passe :</label>
                       <div class="col-sm-6">
                           <input type="text" class="form-control" id="confirmPassword" name="confirmPassword">
                       </div>
                   </div>
                   <div class="form-group row">
                       <label for="email" class="col-sm-4 col-form-label">Email :</label>
                       <div class="col-sm-6">
                           <input type="text" class="form-control" id="email" name="email">
                       </div>
                   </div>
                   <div class="form-group row">
                       <label for="email" class="col-sm-4 col-form-label">Confirmer Email : </label>
                       <div class="col-sm-6">
                           <input type="text" class="form-control" id="confirmEmail" name="confirmEmail">
                       </div>
                   </div>
                </div>
              </form>
                <div class="modal-footer">
                    <input form="form-account" type="submit" class="btn btn-primary" value="Valider">
                </div>
              </div>
            </div>
          </div>
      </div>
`


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = /* @html */ `<div class="video">
    <p><i>"Il y a une naissance en toute connaissance."</i> - Pascal Quignard</p>
      <div class="row">
        <div class="offset-md-3 col-md-6 col-sm-12">
            <div class="video-container">
            <iframe src="https://www.youtube.com/embed/SOcwXwxl4UU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        </div>
      </div>
    </div>
    `


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(0)
const searchbarHtml = __webpack_require__(1)
function getGivemanHtml(giveman){
  return `
  <li class="media">
    <img class="mr-3" src="images/${giveman.photo}" alt="Generic placeholder image" width="12%">
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


/***/ })
/******/ ]);
