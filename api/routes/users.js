const express = require('express')
let User = require('../models/user')
const router = express.Router();


router.route('/register').post( (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    password: req.body.pass
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
    User.findOne({username: req.body.username, password: req.body.pass})
    .then((user) => {
      console.log(user)
      if(user != null)
      {
        // Buat session baru
        req.session.username = user.username
        req.session.name = user.name
        req.session.id = user._id
        res.json({username: req.session.username, name: req.session.name, id: req.session.id})
      }
      else{
        res.json({message: "user not found"})
      }
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
