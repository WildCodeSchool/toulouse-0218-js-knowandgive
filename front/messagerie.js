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
  <div id="scroll">
  <div id="liste-messages" class="contenu-message">
      ${
        messages.map(getMessageHTML).join('\n')
      }
  </div>
</div>
    <form id="sendMessage">
    <input class="chat-input" required></input>
    <input type="submit" value="Envoyer" class="message-send" />
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
        function scrollToBottom() {
          const contenantScroll = $('#scroll')
          const contenuScroll = $('#scroll > div')
          const offset = contenuScroll.height() - contenantScroll.height()
          console.log( $('#scroll').height() )
          $('#scroll').scrollTop(offset)
          $("#scroll").on('scroll', () => {
            console.log($('#scroll').scrollTop())
            })
        }
        scrollToBottom()

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
              scrollToBottom()

            })
          })
        })
      })
    }
  })
}
//FIn de test //
