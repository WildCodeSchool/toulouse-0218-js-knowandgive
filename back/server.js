
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database')

const path = require('path')
const staticPath = path.normalize(__dirname + '/../public')
app.use(express.static(staticPath))
app.use(bodyParser.json())

const html = /* @html */`
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="recherche.css">
    <link rel="stylesheet" href="css/givemenStyle.css">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Amaranth" rel="stylesheet">

    <title>Know & Give</title>
  </head>
  <body>
    <div id="main">

    </div>
  </body>

 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <script src="/js/autocomplete.js"></script>
      <script src="page.js"></script>
      <script src="app.js"></script>
</html>
`



// const users = []
// let id = 1



app.post('/connexion', (req, res) => {
    console.log(req.body)

    const user = req.body.user
    const passwordConnection = req.body.passwordConnection
    const query = `SELECT user, password FROM User WHERE user = '${user}' AND password = '${passwordConnection}'`


    connection.query(query, (error, results) => {
      if(error) {
        return res.status(500).json({
          error: error.message
        })
      }
      const user = results[0]
      res.json({ result: results[0] })
    })
})


app.post('/create-account', (req, res) => {
  console.log(req.body)

  const username = req.body.username
  const confirmEmail = req.body.confirmEmail
  const email = req.body.email
  const confirmPassword = req.body.confirmPassword
  const password = req.body.password
  let query
  // const request = `SELECT user FROM User`
  // if (request == username) {
  //   return alert('L\'indetifiant est déjà pris')
  // }
  if ((email == confirmEmail) && (password == confirmPassword)) {
    query = `INSERT INTO User (user, email, password) VALUES ('${username}', '${confirmEmail}', '${confirmPassword}')`
  }



  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    const username = results[0]
    res.json({ result: results[0]})
  })
  console.log(query)
})



  app.get('/chat/people',(req, res) => {
    const connectionId = 7
    const sql =`SELECT recipientId, senderId FROM Message WHERE senderId = ${connectionId}
    OR recipientId = ${connectionId}`

    connection.query(sql, (error, results)=> {
      if (error) {
        return res.status(500).json({
          error: error.message
        })
      }
      const profileIds = []
      for (let message of results) {
        if (connectionId == message.senderId ) {
          if (profileIds.includes(message.recipientId) === false) {
            profileIds.push(message.recipientId)
          }
        }
        if (connectionId == message.recipientId ) {
          if (profileIds.includes(message.senderId) === false) {
            profileIds.push(message.senderId)
          }
        }

      }

      const finalQuery = `SELECT id, firstname, lastname FROM Profile WHERE id IN (${profileIds.join()}) `
      console.log(results, profileIds, finalQuery)
        connection.query(finalQuery, (error, profiles) =>{
          if (error) return res.status(500).send(error.message);
          // const profilesId = resultats2[0].profileIds
          console.log(profiles)
          res.json(profiles)

        })

    })
  })



app.get('*', (req, res) => {
    res.send(html)
    res.end()
})


console.log('Server listening on http://127.0.0.1:4000')
app.listen(4000)
