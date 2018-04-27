
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'tmp/'})
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database')
const session = require('express-session')
const fs = require('fs')
const path = require('path')
const staticPath = path.normalize(__dirname + '/../public')
// app.use(session({ secret: "cats", resave: true, saveUninitialized: true }))
app.use(express.static(staticPath))
app.use(bodyParser.json())
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }))



const html = user => /* @html */`
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
    <link rel="stylesheet" href="/css/givemenStyle.css">
    <link rel="stylesheet" href="/css/chat.css">
    <link rel="stylesheet" href="/css/style.css">

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
      <script src="/page.js"></script>
      <script>
      let LoggedInUser = ${JSON.stringify(user)}
      </script>
      <script src="/app.js"></script>
</html>
`

// Test Thomas  requête BDD //
  app.get('/search-givemen', (req, res) =>{
    console.log(req.query)
    const skill = req.query.skill
    const sql = `SELECT skill, id FROM Skill WHERE skill = "${skill}" `

    connection.query(sql, (error, resultats) => {
      console.log(resultats)
      if (error) return res.status(500).send(error.message)

      if (resultats.length === 0) {
        return res.json([])
      }
      const skillId = resultats[0].id
      const sqlPivot = `SELECT profileId FROM ProfileSkill WHERE skillId = ${skillId}`

      connection.query(sqlPivot, (error, resultats2) =>{
        if (error) return res.status(500).send(error.message)

        if (resultats2.length === 0) {
          return res.json([])
        }
        const profileIds = resultats2.map(x => {
          return x.profileId
        })

        const finalQuery = `SELECT id, firstname, lastname, photo, description FROM Profile WHERE id IN (${profileIds.join()}) `
        connection.query(finalQuery, (error, resultats3) =>{
          if (error) return res.status(500).send(error.message)
          // const profilesId = resultats2[0].profileIds
          console.log(resultats3)
          res.json(resultats3)

        })

      })
   })

  })

// Fin de test Thomas //

const checkLoggedInUser = (req, res, next) => {
  if((req.session !== undefined) && (req.session.user !== undefined)) {
    const user = req.session.user
    next()
  }
  else {
    res.status(401).json({
      error: 'Unauthorized Access'
    })
  }
}

app.post('/connexion', (req, res) => {
    console.log(req.body)

    const userConnection = req.body.userConnection
    const passwordConnection = req.body.passwordConnection
    const query = `SELECT User.user, User.password, Profile.id FROM User, Profile WHERE User = '${userConnection}' AND User.id = Profile.userId`
    // const query = `SELECT u.user, u.password, p.id FROM User u WHERE u.user = '${userConnection}' INNER JOIN Profile p ON u.id = p.userId`

  connection.query(query, (error, results) => {
  console.log(results)
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if (results.length === 0) {
      return res.status(400).json({
        error: 'Identifiant ou mot de passe incorrect'
      })
    }
    if ((results[0].user == userConnection) && (results[0].password !== passwordConnection)){
      return res.status(400).json({
        error: 'Identifiant ou mot de passe incorrect'
      })
    }
    const user = results[0]
    req.session.user = user
    res.json(user)
  })
})

const newAccount = (req, res, next) => {
  if((req.session !== undefined) && (req.session.user !== undefined)) {
    const user = req.session.user
    next()
  }
  else {
    res.status(401).json({
      error: 'Unauthorized Access'
    })
  }
}

app.post('/create-account', (req, res) => {
  console.log(req.body)

  const username = req.body.username
  const confirmEmail = req.body.confirmEmail
  const email = req.body.email
  const confirmPassword = req.body.confirmPassword
  const password = req.body.password
  let request1 = `SELECT user FROM User WHERE user = '${username}'`
  let request2

  connection.query(request1, (error, resultats) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if ((resultats.length > 0) && (resultats[0].user === username)) {
      console.log('Identifiant déjà pris')
      return res.status(400).json({
        error: 'Identifiant déjà pris'
      })
    }
    if ((email === confirmEmail) && (password === confirmPassword)) {
      request2 = `INSERT INTO User (user, email, password) VALUES ('${username}', '${confirmEmail}', '${confirmPassword}')`
      connection.query(request2, (error, results) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        const username = results[0]
        console.log(results)
        let request3 = `INSERT INTO Profile (userId) VALUES (${results.insertId})`
        console.log(request3)
        connection.query(request3, (error, resultat) => {
          if (error){
            return res.status(500).json({
              error: error.message
            })
          }
          const username = req.body.username
          let request4 = `SELECT User.user, User.email, Profile.id FROM User, Profile WHERE user = '${username}' AND userId = ${results.insertId}`
          console.log(request4)
          connection.query(request4, (error, resultat) => {
            if (error){
              return res.status(500).json({
                error: error.message
              })
            }
            const user = resultat[0]
            req.session.user = user
            console.log(user)
            res.json(user)
          })
        })
      })
    }
  })
})

//Gestion de l'envoi du formulaire sur serveur
app.post('/informations-personnelles', (req, res) => {
  console.log(req.body)

  const nom = req.body.lastname
  const prenom = req.body.firstname
  const codePostal = req.body.zipCode
  const ville = req.body.city
  let profileId = req.session.user.id
  const linkedin = req.body.linkedin
  const description = req.body.description

  const query1 = `UPDATE Profile SET lastname = '${nom}', firstname = '${prenom}', zipCode = '${codePostal}', city = '${ville}', linkedin = '${linkedin}', description = '${description}' WHERE id = '${profileId}'`
  console.log(query1)
  connection.query(query1, (error, resultats) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    const profile = resultats
    console.log(profile)
    res.json({result: profile})
  })
})

app.post('/competences', (req, res) => {
  console.log(req.body)

  const competence = req.body.competence
  let request1 = `SELECT id, skill FROM Skill where skill = '${competence}'`
  let LoggedInUserId = req.session.user.id
  const profileId = LoggedInUserId

//1. On vérifie si la compétence existe
  connection.query(request1, (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
// 2. Cas où elle existe
    if(results.length > 0) {
      const skill = results[0]
      console.log(skill)
      const skillId = skill.id
      let request2 = `INSERT INTO ProfileSkill (skillId, profileId) VALUES ('${skillId}', '${profileId}')`
      console.log(request2)
      connection.query(request2, (error, result) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        const profileSkill = result
        console.log(profileSkill)
        return res.json({result: profileSkill})
      })
    }
//2. Cas où elle n'existe pas
    const query1 = `INSERT INTO Skill (skill) VALUES ('${competence}')`

    connection.query(query1, (error, resultats) => {
      if (error) {
        return res.status(500).json({
          error: error.message
        })
      }
      const competenceEntree = resultats
      console.log(competenceEntree)
      const query2 = `INSERT INTO ProfileSkill (skillId, profileId) VALUES ('${resultats.insertId}', '${profileId}') `
      console.log(query2)
      connection.query(query2, (error, result) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        const newSkill = result
        console.log(newSkill)
        res.json({result: newSkill})
      })
    })
  })
})






//Fin gestion du formulaire


//fonction upload de la photo
app.post('/uploaddufichier', upload.single('monfichier'), function(req, res, next) {
    //traitement du formulaire
    fs.rename(req.file.path, './public/images/' + req.file.originalname, function(err) {
      if (err) {
        res.status(500).json({
          error: error.message
        })
      }
    //Type de fichier
      // if (req.file.mimetype !== 'image/jpeg') {
      //   res.send('Type de fichier non-supporté')
      // }
      //Limite de poids du fichier
      if (req.file.size > 1300000) {
        res.send('Fichier trop gros')
      }
      //Succès de l'upload
      else {
      res.send('Fichier uploadé avec succès')
      }
    })
    //Fin traitement formulaire
})
//fin upload photo

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

    app.get('/chat/messages/:otherId',(req, res) => {
      const connectionId = 7
      const otherId = req.params.otherId
      const sqlMessage = `SELECT message, dateTime, senderId, recipientId FROM Message WHERE (recipientId = ${connectionId}
      AND senderId = ${otherId})
      OR senderId = ${connectionId} AND recipientId = ${otherId}
      ORDER by dateTime ASC`

      connection.query(sqlMessage, (error, results)=> {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        console.log(results)
        res.json(results)


      })

    })
    app.post('/chat',(req, res) => {
      const connectionId = 7
      const message = req.body.message
      console.log(req.body,req.session)

  })

    //const queryInsertMessage = `INSERT INTO Message (senderId, recipientId, dateTime, messages)
    //value ()`


    app.get('/getProfileData/:profileId', (req, res ) => {
      const profileId = req.params.profileId
      const query = `SELECT id, lastname, firstname, zipCode, city, photo, linkedin FROM Profile WHERE id = ${profileId}`

      connection.query(query, (error, pageProfil) => {
        if(error) {
          return res.status(500).json({
          error: error.message
          })
        }
        if(pageProfil.length === 0) {
          return res.status(404).json({
            error: `${profileId} not found`
          })
        }

        // res.json(pageProfil[0])

        const sqlPivot2 = `SELECT skillId FROM ProfileSkill WHERE profileId = ${profileId}`

        connection.query(sqlPivot2, (error, pageProfil2) => {
          if (error) return res.status(500).send(error.message)

          if (pageProfil2.length === 0) {
            return res.json([])
          }
            const skillIds = pageProfil2.map(x => {
            return x.skillId
          })

        const finalQuery2 = `SELECT skill FROM Skill WHERE id IN (${skillIds.join()}) `
        connection.query(finalQuery2, (error, pageProfil3) =>{
          if (error) return res.status(500).send(error.message)
              // const profilesId = resultats2[0].profileIds
          console.log(pageProfil3)
            const skillNames = pageProfil3.map(skillObj => {
            return skillObj.skill
          })


          const informationUser = pageProfil[0]
          informationUser.skills = skillNames

          console.log(informationUser, pageProfil3)

          res.json(informationUser)

        })
      })
    })
    })





app.get('*', (req, res) => {
    console.log(req.session.user)
    res.send(html(req.session.user))
    res.end()
})


console.log('Server listening on http://127.0.0.1:4000')
app.listen(4000)
