const render = require('./render')
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
  <div class="container-fluid">
    <h1>Bienvenue sur ma page</h1>
    <div class="row">
        
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
}
// Fin test navigation thomas //
