const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const helpers = require('./helpers.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser());

app.use(express.static(__dirname + '/../react-client/dist'));


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

app.get('/monsterlist', (req, response) => {
  axios('http://www.dnd5eapi.co/api/monsters')
  .then(res => {
    response.send(res.data);
  })
});

app.get('/monster', (req, response) => {
  const url = req.query.url;
  axios(url)
  .then(res => {
    response.send(res.data);
  });
});

app.get('/monsterimg', (req, response) => {
  const monsterName = req.query.monsterName;
  const monsterPath = monsterName.split(' ').join('-');
  axios.get(`https://www.dndbeyond.com/monsters/${monsterPath}`)
  .then(res => {
    return new Promise((resolve, reject) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const imgSrc = $('.monster-image').attr('src');
      return imgSrc !== undefined ? resolve(imgSrc) : reject(imgSrc);
    });
  })
  .then(imgSrc => {
    if (imgSrc.substring(0, 6) === 'https:') {
      response.send(imgSrc);
    } else {
      response.send(`https:${imgSrc}`);
    }
  })
  .catch(imgSrc => {
    axios.get(`https://www.aidedd.org/dnd/monstres.php?vo=${monsterPath}`)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);
      const imgSrc = $('.picture').attr('src');
      response.send(imgSrc);
    });
  });
});

app.get('/classimg', (req, res1) => {
  const classPath = req.query.className.split(' ').join('-');
  axios.get(`https://www.dndbeyond.com/characters/classes/${classPath}`)
  .then(res2 => {
    const html = res2.data;
    const $ = cheerio.load(html);
    const imgSrc = $('.image').attr('src');
    res1.send(imgSrc);
  });
});

app.post('/savePlayer', (req, res) => {
  db.savePlayer(req.body, (err, success) => {
    if (err) {
      console.log(err)
    } else {
      res.sendStatus(201);
    }
  })
})

app.get('/getGroups', (req, res) => {
  db.getGroups(req.query, (err, groups) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(groups);
    }
  })
})

app.get('/specificGroup', (req, res) => {
  db.specificGroup(req.query, (err, players) => {
    if (err) {
      console.log(err)
    } else {
      console.log(players);
      res.status(200).send(players);
    }
  })
})

// update an existing password
app.post('/changePassword', (req, res) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;

  bcrypt.hash(password, saltRounds).then((hash) => {
    db.resetPassword(username, hash, email, (err, done) => {
      if (err) {
        res.sendStatus(500);
      } else if (done === 400) {
        res.sendStatus(400);
      } else if (done === 401) {
        res.sendStatus(401);
      } else {
        res.sendStatus(201);
      }
    })
  })
})

// update an existing email address
app.post('/changeEmail', (req, res) => {
  username = req.body.username;
  email = req.body.email;  

  db.changeEmail(username, email, (err, done) => {
    if (err) {
      res.send('Server error')
    } else if (done === null) {
      res.send('Could not find username')
    } else {
      res.send('Email has been changed')
    }
  })
})

// email a new password
app.get('/forgotPassword', (req, res) => {
  username = req.query.username;
  email = req.query.email
  password = helpers.makeid();

  bcrypt.hash(password, saltRounds).then((hash) => {
    db.resetPassword(username, hash, email, (err, done) => {
      if (err) {
        res.sendStatus(500);
      } else if (done === 400) {
        res.sendStatus(400);
      } else if (done === 401) {
        res.sendStatus(401);
      } else {
        helpers.sendEmail(done.email, password, res)
        .then((success) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(501);
        });        
      }
    })
  })
})

app.post('/login', (req, res) => {
  db.getUsers(req.body.username, (err, user) => {
    if (err) {
      res.sendStatus(500)
    } else {
      if (user.length === 0) {
        res.sendStatus(401);
      } else {
        bcrypt.compare(req.body.password, user[0].password)
        .then(result => {
          if (result) {
            res.sendStatus(201);
          } else {
            res.send(402);
          }
        });
      }
    }
  })
})

app.post('/signUp', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => {
    req.body.password = hash;
    db.signUpUser(req.body, (err, success) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
})


