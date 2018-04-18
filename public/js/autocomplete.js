
function autocomplete(inp, arr) {			/* Cette fonction comporte deux arguments , le champs d'écriture ainsi que l'array pour l'auto complétion */

  var currentFocus;
  /*VA S EXECUTER LORSQU UN EVENEMENT AURA LIEU , ICI , LE FAIT DE RENSEIGNER LE CHAMP */
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*VA CREER UNE DIV MAIS JE SAIS PAS POURQUOI :/ */
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*UNE PARTIE DE L AUTO COMPLETION SE PASSE ICI , MAIS JE SAIS PAS QUOI */
      this.parentNode.appendChild(a);
      /*POUR CHAQUES OBJETS DE L ARRAY */
      for (i = 0; i < arr.length; i++) {
        /* VA , A CHAQUE LETTRES ENREGISTREES , COMPARER AVEC LES MOTS CLEFS ENREGISTRES DANS LA VARIABLE DEFINIE TOUT EN BAS DU CODE , POUR LES MATCHER */
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*VA CREER UNE DIV POUR CHAQUES ELEMENTS QUI MATCHENT SI CETTE CONDITION EST VRAIE*/
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*VA EXECUTER UNE FONCTION SI L ON CLIQUE SUR UNE PROPOSITION*/
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("keydown", function(e) /* EXECTUTE LA FONCTION DES QU UNE TOUCHE EST APPUYEE */{ 
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*SI LA TOUCHE FLECHE DU BAS EST UTILISEE , SWITCH ENTRE LES COMPETANCES DU MENU DEROULANT*/
        currentFocus++;
        /*ET MET EN VALEUR LA COMPETENCE SELECTIONNEE */
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*SI LA FLECHE DU HAUT EST UTILISEE , SWITCH ENTRE LES COMPETANCES DU MENU DEROULANT */
        currentFocus--;
        /*ET MET EN VALEUR LA COMPETENCE SELECTIONNEE */
        addActive(x);
      } else if (e.keyCode == 13) {
        /*SI ON APPUIE SUR ENTREE, SELECTIONNE LE MOT CLEF*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*SIMULE LE CLICK*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a FONCTION POUR SIMULER UN OBJET COMME ETANT ACTIF*/
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*JE SAIS PAS CE QUE CA VEUX DIRE*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a CA ENLEVE UN ITEM ACTIF QUAND CA NE CORRESPOND PLUS*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close FERME LE MENU DEROULANT LORSQUE LES RECHERCHES NE CORRESPONDENT PLUS A CE QUI EST RENSEIGNE PAR L UTILISATEUR*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) /* EXECTUTE LA FONCTION QUAND LE MOT CLEF EST CLIQUE */ {
      closeAllLists(e.target);
      });
}