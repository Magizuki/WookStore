const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    isPaid: {
        type: Boolean,
        required: true
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart