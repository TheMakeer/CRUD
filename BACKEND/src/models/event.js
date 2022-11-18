const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({

    name:{type: String,required: true,},
    place:String,
    date_start:{type:String,required:true,},    
    date_end:{type:String,required:true,},
    status: String,
    company_id:[{type: Schema.Types.ObjectId, ref:'Company'}]
    
});

module.exports = mongoose.model('Event', eventSchema);