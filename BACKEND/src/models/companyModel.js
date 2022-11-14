const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
    }
});