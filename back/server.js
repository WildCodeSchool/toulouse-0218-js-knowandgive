
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database')
const session = require('express-session')


const path = require('path')
const staticPath = path.normalize(__dirname + '/../public')
app.use(express.static(staticPath))
app.use(bodyParser.json())

const middleware1 = (req, res, next) => {
  console.log('Je suis le middleware1')
  // Passer à la suite
  next()
}


const middleware2 = (req, res, next) => {
  console.log('Je suis le middleware2')
  // Passer à la suite
  next()
}

app.use(middleware2)
app.use(middleware1)



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



app.post('/connexion', (req, res) => {
    console.log(req.body)

    // const {userConnection, passwordConnection} = req.body

    const userConnection = req.body.userConnection
    const passwordConnection = req.body.passwordConnection
    const query = `SELECT user, password FROM User WHERE user = '${userConnection}'`




  connection.query(query, (error, results) => {
  console.log(results)
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    // if (results.length < 0) {
    //   return res.status(400).json({
    //     error: 'Identifiant ou mot de passe incorrect'
    //   })
    // }
    if ((! results[0].user) || (results[0].password !== passwordConnection)){
      return res.status(400).json({
        error: 'Identifiant ou mot de passe incorrect'
      })
    }
    if ((results[0].user == userConnection) && (results[0].password == passwordConnection)){
      const user = results[0]
      req.session.user
      res.json({ result: results[0] })
    }
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
  // let query = `SELECT COUNT(id) FROM User WHERE user = '${username}'`
  // if (query = 0) {
  //   console.log('Identifiant déjà pris')
  // }
  let request = `SELECT user FROM User WHERE user = '${username}'`
  console.log(request)
  connection.query(request, (error, resultats) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if ((resultats.length > 0) && (resultats[0].user == username)) {
      console.log('Identifiant déjà pris')
      return res.status(400).json({
        error: 'Identifiant déjà pris'
      })
    }
    if ((email == confirmEmail) && (password == confirmPassword)) {
      query = `INSERT INTO User (user, email, password) VALUES ('${username}', '${confirmEmail}', '${confirmPassword}')`
      connection.query(query, (error, results) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        const username = results[0]
        console.log(results)
        res.json({ result: results[0]})
      })
    }
  })
})




app.get('*', (rep, res) => {
    res.send(html)
    res.end()
})


console.log('Server listening on http://127.0.0.1:4000')
app.listen(4000)
