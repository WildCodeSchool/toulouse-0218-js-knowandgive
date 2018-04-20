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

// Test Thomas  requête BDD //
  app.get('/bricolage', (req, res) =>{
    console.log(req.query) 
    const skill = req.query.skill
    const sql = `SELECT skill, id FROM Skill WHERE skill = "${skill}" `
   
    connection.query(sql, (error, resultats) => {
      console.log(resultats)
      if (error) return res.status(500).send(error.message);
      const skillId = resultats[0].id
      const sqlPivot = `SELECT profileId FROM ProfileSkill WHERE skillId = ${skillId}`

      connection.query(sqlPivot, (error, resultats2) =>{
        if (error) return res.status(500).send(error.message);
        
        const profileIds = resultats2.map(x => {
          return x.profileId
        })

        // if 

        const finalQuery = `SELECT id, firstname, lastname, photo, description FROM Profile WHERE id IN (${profileIds.join()}) `
        connection.query(finalQuery, (error, resultats3) =>{
          if (error) return res.status(500).send(error.message);
          // const profilesId = resultats2[0].profileIds
          console.log(resultats3)
          res.json(resultats3)
            
        })

          // console.log(profileIds)
          
      })




       
   })

  })

  // app.get('/bricolage', (req, res) =>{
  //  connection.query('SELECT * FROM Profile WHERE userID = "bricolage" ', (error, bricolage,) => {
  //      // if (error) throw error;
  //      if (error) {
  //       return res.status(500).json({ 
  //         error: error.message
  //       })
  //      }
  //      console.log('The solution are: ', bricolage)
  //      res.json(bricolage)
  //  })
  // })
// Fin de test Thomas //

// const users = []
// let id = 1

app.post('/connexion', (req, res) => {
    console.log(req.body)

    const user = req.body.user
    const password = req.body.password
    const query = `SELECT user, password FROM User WHERE user = '${user}' AND password = '${password}'`


    connection.query(query, (error, results) => {
      if(error) {
        return res.status(500).json({
          error: error.message
        })
      }
      const user = results[0]
      res.json({ result: results[0] })
    })



    //
    // const existingUser = users.find(user => user.email === email)
    // if(existingUser !== undefined) {
    //     return res.status(400).json({
    //         error: 'Email déjà enregistré'
    //     })
    // }
    //
    // const newUser = {
    //     identifiant: id,
    //     mdp: password
    // }
    //
    // users.push(newUser)
    //
    // id += 1
    //
    // res.json(newUser)
})


app.get('*', (rep, res) => {
    res.send(html)
    res.end()
})


console.log('Server listening on http://127.0.0.1:4000')
app.listen(4000)
