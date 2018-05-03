const render = require('./render')
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
        let offset = (LoggedInUserId == message.senderId) ? "'col-md-3 offset-md-6'" : "'col-md-4'"
        let statut = (LoggedInUserId == message.senderId) ? "envoie" : "recu"

        return /* @html */`
        <div class="row">
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
        <div class="contenu-message">`



module.exports = () => {
  let recipientId
  // 1. Récupération des données depuis le serveur
  fetch('/messagerie/people')
  .then(response => response.json())
  .then(contacts => {
    // 2. Affichage
    console.log(contactHtml(contacts))
    render(contactHtml(contacts))

    // 3. Mise en place des gestionnaires d'évènements

    const divAllContacts = document.getElementsByClassName('contacts')
    const h4InContacts = divAllContacts[0].getElementsByTagName('h4')
    console.dir(divAllContacts)
    for( let div of h4InContacts) {
      div.addEventListener('click', function (event) {
        console.log(event.target.dataset.id)
        event.target.classList.add('active')
        recipientId = event.target.dataset.id
        fetch(`/messagerie/messages/${event.target.dataset.id}`)
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
