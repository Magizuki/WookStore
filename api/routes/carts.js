const express = require('express')
let Cart = require('../models/cart')
const router = express.Router()

router.route('/addNewCart').post((req, res) => {
    
    Cart.findOne({userID: req.body.userID, bookID: req.body.bookID, isPaid: false})
    .then(cart => {
        console.log(cart)
        if(cart != null)
        {
            cart.quantity = parseInt(cart.quantity) + parseInt(req.body.quantity)
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

router.route('/getUserCartList').post((req, res) => {
    Cart.find({userID: req.body.userID, isPaid: false})
    .then(cart => {
        console.log(cart.length)
        res.json(cart)
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })

})

router.route('/removeAllCart').post((req, res) => {
    Cart.remove({userID: req.body.userID, isPaid: false})
    .then(() => {
        res.json({message: "All Cart Removed"})
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })
})

router.route('/removeCart').post((req, res) => {
    Cart.remove({_id: req.body.id})
    .then(() => {
        res.json({message: "Cart Removed"})
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })
})

router.route('/updatePaidStatus').post((req, res) => {

    Cart.updateMany({userID: req.body.userID, isPaid: false}, {$set: {isPaid: true}})
    .then(() => {
        res.json({message: "Payment Success"})
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })

})

module.exports = router