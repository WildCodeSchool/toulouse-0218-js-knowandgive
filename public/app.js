'use strict'
const mainDiv = document.getElementById('main')

const navbarHtml = /* @html */ `
  <nav class="navbar navbar-expand-lg">
      <img class="logo" src="/img/logo.png">
      <a class="navbar-brand" href="/">Know & Give</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto">
            <div class="navbar-nav">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">S'inscrire </button>
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
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Connexion  </button>
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
const navbarBisHtml = /* @html */ `
<nav class="navbar navbar-expand-lg">
    <img class="logo" src="/img/logo.png">
    <a class="navbar-brand" href="/">Know & Give</a>
    <div class="collapse navbar-collapse" id="icons-position">
      <div class="icons">
        <ul class="navbar-nav mr-auto">
            <a href="/messagerie"><span class="icon-envelop fa-2x"></span></a>
            <a href="/pagePerso"><span class="icon-user fa-2x"></span></a>
            <a href="/"><span class="icon-switch fa-2x"></span></a>
        </ul>
      </div>
    </div>
</nav>
`

const searchbarHtml = /* @html */ `<div class="row position">
      <img src="/img/banniere-know-and-give.png" alt="imageSearch"/>
      <div id="searchbar">
        <form id="search-form" action="#" class="formulaire">
          <div class="autocomplete">
            <!-- <input class="champ" type="text" value="Search(...)"/> -->
            <input id="myInput" type="text" name="Skill" placeholder="Rechercher des compétences">
            <input class="bouton" type="submit" value="Je recherche" />
          </div>
        </form>
      </div>
    </div>
`
const presentationHtml = /* @html */ `<div class="video">
    <p><i>"Il y a une naissance en toute connaissance."</i> - Pascal Quignard</p>
    <iframe width="672" height="378" src="https://www.youtube.com/embed/SOcwXwxl4UU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    `


const competencesHtml = /* @html */ `<div class="competences">
      <h3>Les <b>domaines</b> les plus <b>populaires</b></h3>
      <div class = "row items">
      <div class = "col-md-3">
        <img src="img/bricolage.png" alt="vignette bricolage" width="25%"><br>
        <h4>Bricolage</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/decoration.png" alt="vignette Décoration" width="25%"><br>
        <h4>Décoration</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/enseignement.png" alt="vignette Enseignement" width="25%"><br>
        <h4>Enseignement</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/cuisine.png" alt="vignette Cuisine" width="25%"><br>
        <h4>Cuisine</h4><!-- Page de recherche correspondante -->
      </div>
    </div>
    <div class = "row items">
      <div class = "col-md-3">
        <img src="img/mode-et-beauté.png" alt="vignette Mode_et_beauté" width="25%"><br>
        <h4>Mode et beauté</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/art.png" alt="vignette Art" width="25%"><br>
        <h4>Art</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/famille.png" alt="vignette Famille" width="25%"><br>
        <h4>Famille</h4><!-- Page de recherche correspondante -->
      </div>
      <div class = "col-md-3">
        <img src="img/jardinerie.png" alt="vignette Jardinerie" width="25%"><br>
        <h4>Jardinerie</h4><!-- Page de recherche correspondante -->
      </div>
    </div>
  </div>
`

const footerHtml = /* @html */ `<footer class="footer">
    <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6  col-lg-3 ">
            <ul class="nav">
                <li class="nav-item"><a href="" class="nav-link"><img src="/img/facebook.png" alt="facebook" width="13px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="/img/instagram.png" alt="instagram" width="35px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="/img/wcs.png" alt="instagram" width="30px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="/img/twitter.png" alt="instagram" width="30px"></a></li>
            </ul>
            <br>
            <p>By Wild Code School</p>
          </div>
        </div>
    </div>
  </footer>
`
const charteGivemanHtml = /* @html */ `<div class="giveman">
        <h3>Un <b>giveman</b> , qu'est ce que c'est ?</h3>
          <ul>
            <li><img src="img/giveman.png" alt="vignette valeur 1" width="3%">valeur 1</li>
            <li><img src="img/giveman.png" alt="vignette valeur 2" width="3%">Valeur 2</li>
            <li><img src="img/giveman.png" alt="vignette valeur 3" width="3%">Valeur 3</li>
            <li><img src="img/giveman.png" alt="vignette valeur 4" width="3%">Valeur 4</li>
            <li><img src="img/giveman.png" alt="vignette valeur 5" width="3%">Valeur 5</li>
          </ul>
          <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            <img src="img/giveman.png" alt="giveman" width="10%">
            Toi aussi, deviens un giveman !
            <img src="img/giveman.png" alt="giveman" width="10%">
          </button>
      </div>
`



function getGivemanHtml(giveman){
  return `
  <li class="media">
    <img class="mr-3" src="${giveman.photo}" alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1"><a href="/pageProfil/${giveman.id}">${giveman.firstname} ${giveman.lastname}</a></h5>
      <p>${giveman.description}</p>
       </div>
  </li>
  `
}

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
        <div class="contenu-message">
            ${
              messages.map(getMessageHTML).join('\n')
            }
        </div>
          <form id="sendMessage">
          <input class="chat-input" required></input>
          <input type="submit" value="Send" class="message-send" />
        </form>
      `

function formatDateTime(dateTime) {

}






const resultHtml = givemen => `<ul class="list-unstyled">
  ${
    givemen.map(getGivemanHtml).join('\n')
  }
  </ul>
`
const pagePersoHtml = /* @html */ `
       <h1>Informations personnelles</h1>
       <div class="container" id="formInfo">
           <div class="row">
               <div class="col-md-6 imgProfil">
                   <!-- Upload de la photo -->
                   <form method="POST" enctype="multipart/form-data" action="/uploaddufichier">
                      <input type="file" name="monfichier">
                        <button> envoyer </button>
                   </form>
                   <!-- fin Upload photo -->
               </div>
               <div class="col-md-6">
                   <div class="card">
                       <div class="card-header">A propos de moi</div>
                       <div class="card-body">
                           <form id="formProfile" action="/informations-personnelles" method="POST">
                               <div class="form-group row">
                                   <label for="lastname" class="col-sm-4 col-form-label">Nom :</label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="lastname" name="lastname">
                                   </div>
                               </div>
                               <div class="form-group row">
                                   <label for="fisrtname" class="col-sm-4 col-form-label">Prénom :</label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="firstname" name="firstname">
                                   </div>
                               </div>
                               <div class="form-group row">
                                   <label for="postal" class="col-sm-4 col-form-label">Code postal :</label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="postal" name="zipCode">
                                   </div>
                               </div>
                               <div class="form-group row">
                                   <label for="city" class="col-sm-4 col-form-label">Ville :</label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="city" name="city">
                                   </div>
                               </div>
                               <div class="form-group row">
                                   <label for="email" class="col-sm-4 col-form-label">Email : </label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="email" name="email">
                                   </div>
                               </div>
                               <div class="form-group row">
                                   <label for="linkedin" class="col-sm-4 col-form-label">Linkedin : </label>
                                   <div class="col-sm-6">
                                       <input type="text" class="form-control" id="linkedin" name="linkedin">
                                   </div>
                               </div>
                            </form>
                        </div>
                   </div>
               </div>
               <div class="row">
                   <div class="col-md-4">
                       <input form="formProfile" type="submit" class="btn btn-primary" value="Mettre à jour mes coordonnées"></input>
                   </div>
               </div>
           </div>
           <div class="row">
               <div class="col-md-6">
                   <div class="form-group">
                       <h4>Description</h4>
                        <form id="formDescription" method="POST" action="/informations-personnelles">
                          <textarea class="form-control" id="description" rows="7" name="description"></textarea>
                        </form>
                      <input form="formDescription" type="submit" class="btn btn-primary" value="Mettre à jour ma description"></input>
                   </div>
               </div>
               <div class="col-md-6">
                   <h4>Compétences</h4>
                     <span class="badge badge-pill badge-success">Jardinage</span>
                     <span class="badge badge-pill badge-success">Famille</span>
                     <span class="badge badge-pill badge-success">Decoration</span>
                     <span class="badge badge-pill badge-success">Bricolage</span>
                     <span class="badge badge-pill badge-success">Enseignement</span>
                     <span class="badge badge-pill badge-success">Cuisine</span>
                     <span class="badge badge-pill badge-success">Mode et beauté</span>
                     <span class="badge badge-pill badge-success">Art</span><br />
               </div>
           </div>
       </div>
`

function getProfilHtml(informations) {
  return `<p class="card-text"></p>
    <p>
    Nom: ${informations.lastname}<br />
    Prenom: ${informations.firstname}<br />
    Code postal: ${informations.zipCode}<br />
    Ville: ${informations.city}<br />
    Email: ${informations.email}<br />
    linkedin: ${informations.linkedin}</p>`
}

function getSkillBadge(skill) {
  return `<span class="badge badge-pill badge-success">
    ${skill}
  </span>`

}

const pageProfilHtml = informations => /* @html */ `
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
          <img src="" alt="portrait" class=""><br/>
          <a href="/messagerie?contactId=${informations.id}" id="btnContact"  class="btn btn-primary">Contacter</a>
        </div>
        <div class="card-body col-md-10">
          <h5 class="card-title">Description de mes talents</h5>
          ${getProfilHtml(informations)}
          <h5>Mes compétences<h5>
          ${informations.skills.map(getSkillBadge).join('')}
        </div>
      </div>
  </div>
`

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
//
// const showHome = () => {
//   mainDiv.innerHTML = navbarHtml + searchbarHtml + presentationHtml + competencesHtml + charteGivemanHtml + footerHtml
// }

const showPagePerso = () => {
  mainDiv.innerHTML = navbarBisHtml + pagePersoHtml + footerHtml
  removeBackdrops()
}

const showPageProfil = () => {
  mainDiv.innerHTML = navbarHtml + pageProfilHtml({ nom: 'Toto' }) + footerHtml
}

const showNavConnected = () => {
  mainDiv.innerHTML = navbarBisHtml + searchbarHtml + presentationHtml + competencesHtml + charteGivemanHtml + footerHtml
  removeBackdrops()
}

function removeBackdrops() {
  const backdrops = document.getElementsByClassName('modal-backdrop')
  if (backdrops.length > 0) {
    document.body.removeChild(backdrops[0])
  }
  document.body.classList.remove('modal-open')
}


const showContacts = () => {
  let recipientId
  console.log(window.location)
  const search = window.location.search.split("=")
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
          })
        })
      })
    }
  })
}
//FIn de test //

// const search = () => {
//   mainDiv.innerHTML = navbarHtml + searchPageHtml() + footerHtml
// }

const render = mainHTML => {
  const navBar = LoggedInUser === undefined ? navbarHtml : navbarBisHtml
  mainDiv.innerHTML = navBar+ mainHTML + footerHtml
  removeBackdrops()
}

const form = () => {
  render(pagePersoHtml)

  const informations = document.getElementById('formProfile')
  informations.addEventListener('submit', profileFormsListener)
  const description = document.getElementById('formDescription')
  description.addEventListener('submit', profileFormsListener)

}


const profileFormsListener = event => {
  const container = document.getElementById('formInfo')
  event.preventDefault()
  const champs = container.getElementsByClassName('form-control')
  let infoData = {}
  for (let input of champs) {
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
    page('/')
    console.log(data)
  })
}

const home = () => {
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

      })
  })
}

// début test navigation thomas //
const showPagePerso1 = context => {

  const profilId = context.params.profilId
  fetch(`/getProfileData/${profilId}`)
  .then(response => response.json())
  .then(infosProfil => {
    const profilHtml = pageProfilHtml(infosProfil)
    render(profilHtml)




  })

}

// Fin test navigation thomas //

const checkLoginMiddleware = (context, next) => {
  if (LoggedInUser === undefined){
    page('/')
  }
  next()
}

page("/", home)
page("/pagePerso",checkLoginMiddleware, form)
// page("/pageIndexConnecte", showNavConnected)
page("/pageProfil", showPageProfil)
page("/messagerie", showContacts)
page("/pageProfil/:profilId", showPagePerso1)
page()
/////// NE RIEN ECRIRE EN DESSOUS DES APPELS page() ///////
