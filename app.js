const mainDiv = document.getElementById('main')

const navbarHtml = `<nav class="navbar navbar-expand-lg">
      <img class="logo" src="img/logo.png">
      <a class="navbar-brand" href="#">Know & Give</a>
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
                      <form>
                       <div class="form-group row">
                           <label for="identifiant" class="col-sm-4 col-form-label">Identifiant :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="lastname">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="mdp" class="col-sm-4 col-form-label">Mot de passe :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="firstname">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="mdp" class="col-sm-4 col-form-label">Confirmer mot de passe :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="postal">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="email" class="col-sm-4 col-form-label">Email :</label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="city">
                           </div>
                       </div>
                       <div class="form-group row">
                           <label for="email" class="col-sm-4 col-form-label">Confirmer Email : </label>
                           <div class="col-sm-6">
                               <input type="text" class="form-control" id="email">
                           </div>
                       </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary"><a class="renvoi-page-perso btn btn-primary" href="pagePerso.html">Valider</a></input>
                    </div>
                  </form>
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
                      
                      <form id="form-post" method="POST" action="/connexion-url">
                        <div class="form-group row">
                          <label for="identifiant" class="col-sm-4 col-form-label"><i class="fa fa-user"> </i> Identifiant</label>
                          <div class="col-sm-6">
                            <input type="text" class="form-control" id="identifiant">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="motDePasse" class="col-sm-4 col-form-label"><i class="fa fa-key"> </i> Mot de passe</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" id="motDePasse">
                          </div>
                        </div>
                          
  
                    </div>
                    <div class="modal-footer">
                      <input type="submit" class="btn btn-primary" value="Valider" />
                    </div>
                  </form>  
        </ul>
      </div>
    </nav>
`

const searchbarHtml = `<div class="row position">
      <img src="img/echange_cerveau.png" alt="imageSearch"/>
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
const presentationHtml = `<div class="video">
    <p><i>"Il y a une naissance en toute connaissance."</i> - Pascal Quignard</p>
    <iframe width="672" height="378" src="https://www.youtube.com/embed/SOcwXwxl4UU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    `

const competencesHtml = `<div class="competences">
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

const footerHtml = `<footer class="footer">
    <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-6  col-lg-3 ">
              
            <ul class="nav">
                <li class="nav-item"><a href="" class="nav-link"><img src="img/facebook.png" alt="facebook" width="13px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="img/instagram.png" alt="instagram" width="35px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="img/wcs.png" alt="instagram" width="30px"></a></li>
                <li class="nav-item"><a href="" class="nav-link"><img src="img/twitter.png" alt="instagram" width="30px"></a></li>
            </ul>
            <br>
            <p>By Wild Code School</p>
          </div> 
        </div>
    </div>
  </footer>
`
const charteGivemanHtml = `<div class="giveman">
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
      <h5 class="mt-0 mb-1">${giveman.firstname} ${giveman.lastname}</h5>
      <p>${giveman.description}</p>
      <span class="badge badge-pill badge-primary">Bricolage</span> 
       </div>
  </li>
  ` 
}

// console.log(givemen.map(getGivemanHtml).join('\n'))

const resultHtml = givemen => `<ul class="list-unstyled">
    
  ${
    givemen.map(getGivemanHtml).join('\n')
  }

  <li class="media">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      <span class="badge badge-pill badge-primary">Bricolage</span> 
       </div>
  </li>
  <li class="media my-4">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
  <li class="media">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
</ul>
`

function resultKeyword(keyword) {
  return "resultats pour " + keyword
}

function showResultForKeyword(keyword) { 
  const givemen = [
    {
    id: 1,
    firstname : 'Jacques',
    lastname: 'Chirac',
    photo : '/img/art.png',
    description : 'blablabla',
    skills : ['bricolage']
    }
  ]
  render(searchbarHtml + resultHtml(givemen))
}

const render = mainHTML => {
  mainDiv.innerHTML = navbarHtml + mainHTML + footerHtml
}



const search = () => {
  mainDiv.innerHTML = navbarHtml + searchPageHtml() + footerHtml
}

 
const home = () => {
  render(searchbarHtml + presentationHtml + competencesHtml + charteGivemanHtml)

  const connexion = document.getElementById('form-post')
  connexion.addEventListener('submit', event => {

    let data = {}

    event.preventDefault()
    const inputs = connexion.getElementsByTagName('input')
    for (input of inputs) {
      if (input.name !== '') {
        data[input.name] = input.value
      }
    }

    const body = JSON.stringify(data)
    console.log(body)

    fetch('/connexion-url', {
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  })


  const autocompleteInput = document.getElementById("myInput")
  const searchForm = document.getElementById("search-form")
  console.log(searchForm)
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    showResultForKeyword(autocompleteInput.value)
    // const inputElements = searchForm.getElementsByTagName('input')
    // console.log(searchForm.getElementsByTagName('input'))

  })


  var skill = ["Jardinage", "Plomberie", "Batiment", "Plaquiste", "Carreleur", "Menuiserie","Electricité", "Cuisine", "Musique", "Informatique", "Bricolage", "Mécanique"];
    /* FIN DE LA PARTIE MOTS CLEFS */

  autocomplete(autocompleteInput, skill);
}

// home()
// 
page('/', home)
page('/search', search)
// page('*', notfound)
page()

