const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        enum: ["L", "P"],
    },
    noHp: String,
    address: String,
    domicile: String,
    place: String,
    date: Date,
    created_at: {
        type: Date,
        default: Date.now,
    },
    industri: [
        {
            name: String,
            desc: String,
            address: String,
            created_at: Date,
        }
    ]
})

const user = mongoose.model("users", userSchema);

module.exports = user;