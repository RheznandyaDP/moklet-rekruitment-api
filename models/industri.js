const mongoose = require('mongoose');
const schema = mongoose.Schema;

const industriSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    jobs : [
        {
            job_desc: String,
            applicants: [
                {
                    name: String,
                    email: String,
                }
            ]
        }
    ]
})

const industri = mongoose.model("industri", industriSchema);

module.exports = industri;