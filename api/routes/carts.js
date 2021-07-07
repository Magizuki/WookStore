const express = require('express')
let Cart = require('../models/cart')
const router = express.Router()

router.route('/addNewCart').post((req, res) => {
    
    Cart.findOne({userID: req.body.userID, bookID: req.body.bookID, isPaid: false})
    .then(cart => {
        console.log(cart)
        if(cart != null)
        {
            cart.quantity = cart.quantity + req.body.quantity
            cart.save().then(() => {
                res.json({message: "success update cart"})
            }).catch(err => {
                err = "Error when processing in database"
                res.status(400).json({message: err})
            })
        }
        else
        {
            const newCart = new Cart({
                userID : req.body.userID,
                bookID : req.body.bookID,
                quantity : req.body.quantity,
                isPaid : false
            })
        
            newCart.save().then(() => {
                res.json({message: "success add new cart"})
            }).catch(err => {
                err = "Error when processing in database"
                res.status(400).json({message: err})
            })
        }
    })

    

})

module.exports = router