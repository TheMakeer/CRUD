const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({

    first_name:{type: String,required: true,},
    last_name:{type: String,required:true,},
    email:{type:String,required:true,},    
    phone:String,
    password:String,
    _company: {type: Schema.Types.ObjectId, ref: 'companies'},
    
});

module.exports = mongoose.model('Participant', participantSchema);