require('dotenv').config()
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        unique:true
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
    },
    password: {
        type: String, // Changed from Number to String
        required: [true, "Please provide the password"]
    },
    category: {
        type: String,
        required: [true, "Please provide the category"]
    },
    stock: {
        type: Number,
        required: [true, "Please provide the stock"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the price"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description"],
    },
    images: {
        public_id: {
            type: String,
            required: [true, "Please provide the public_id"],
        },
        url: {
            type: String,
            required: [true, "Please provide the url"],
        }
    },
    numOfReview: {
        type: Number ,
    },
    reviews:[
        {
            review: {
                message:String,
                rating:Number,
                writer:String
            },
        },
],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
 