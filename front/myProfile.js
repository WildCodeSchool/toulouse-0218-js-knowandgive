const render = require('./render')

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
                  <input type="text" class="form-control" id="email" name="email">
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


const pagePersoHtml = infosPerso => /* @html */ `

       <h1>Informations personnelles</h1>
       <div class="container" id="formInfo">
           <div class="row">
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
                     <span class="badge badge-pill badge-success">Jardinage</span>
                     <span class="badge badge-pill badge-success">Famille</span>
                     <span class="badge badge-pill badge-success">Decoration</span>
                     <span class="badge badge-pill badge-success">Bricolage</span>
                     <span class="badge badge-pill badge-success">Enseignement</span>
                     <span class="badge badge-pill badge-success">Cuisine</span>
                     <span class="badge badge-pill badge-success">Mode et beauté</span>
                     <span class="badge badge-pill badge-success">Art</span><br />
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
