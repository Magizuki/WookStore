const express = require('express')
let User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')


router.route('/register').post( async (req, res) => {

  //Generate the salt
  //const salt = await bcrypt.genSalt(saltRounds)

  const saltRounds = 10

  //Hash the password
  const hashPassword = await bcrypt.hash(req.body.pass, saltRounds)

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    password: hashPassword
  })

  user.save().then(() => {
        res.json({message: "success"})
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })
    

  // res.send('respond with a resource');
});

  router.route('/login').post((req, res) => {
    User.find({username: req.body.username})
    .then(async (user) => {
      console.log(user)
      for(let i = 0; user.length; i++)
      {
        var isMatch = await bcrypt.compare(req.body.pass, user[i].password)
        console.log(isMatch)
        if(isMatch)
        {
          console.log(1)
          // Buat session baru
          req.session.username = user[i].username
          req.session.name = user[i].name
          req.session.id = user[i]._id
          res.json({username: req.session.username, name: req.session.name, id: req.session.id})
          break
        }
      }
      
        res.json({message: "user not found"})
      
      //res.json(user)
    }).catch(err => {
      err = "Error in database process"
      res.status(400).json({message: err})
    })
  })

  router.route('/deleteuserSession').post((req, res) => {
    req.session = null
    res.end()
    
  })



module.exports = router;
