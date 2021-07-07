const express = require('express')
let Book = require('../models/book')
const router = express.Router()

router.route('/insertBook').post((req, res) => {
    const book = new Book({
        bookName : req.body.bookName,
        price : req.body.price,
        author : req.body.author,
        description : req.body.description,
        image : req.body.image
    })

    book.save().then(() => {
        res.json({message: "success"})
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })

})

router.route('/getBook').post((req, res) => {
    Book.findById(req.body.id)
    .then(book => {
        res.json(book)
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })
})

router.route('/getAllBook').get((req, res) => {
    Book.find()
    .then(books => {
       console.log(books[0])

        res.json(books)
    }).catch(err => {
        err = "Error when processing in database"
        res.status(400).json({message: err})
    })
})

module.exports = router