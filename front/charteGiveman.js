module.exports = /* @html */ `<div class="giveman">
        <h3>Un <b>giveman</b> , qu'est ce que c'est ?</h3>
          <ul>
            <li class="valeur1"><img src="img/giveman.png" alt="vignette valeur 1" width="3%">Un giveman sait qu'il ne connait rien <b>MAIS</b> veut connaitre.</li>
            <li class="valeur2"><img src="img/giveman.png" alt="vignette valeur 2" width="3%">Un giveman a le <b>coeur</b> sur la main.</li>
            <li class="valeur3"><img src="img/giveman.png" alt="vignette valeur 3" width="3%">Un giveman aime <b>donner</b> et <b>recevoir</b>..</li>
            <li class="valeur4"><img src="img/giveman.png" alt="vignette valeur 4" width="3%">Un giveman appartient à une <b>communauté</b> de <b>partage</b> et d'<b>entraide</b>.</li>
            <li class="valeur5"><img src="img/giveman.png" alt="vignette valeur 5" width="3%">Un giveman est <b>curieux</b> et à l'affut de nouvelles connaissances.</li>
            <li class="valeur6"><img src="img/giveman.png" alt="vignette valeur 6" width="3%">Un giveman est <b>universel</b>.</li>
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
