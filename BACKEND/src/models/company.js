// company:  name, status, profile_completed, event_id
const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    
    name:{type: String,required: true,},
    status:String,
    profile_completed:Boolean,
    _event:{type: Schema.Types.ObjectId, ref: 'Event'},
    participant_id:[{type: Schema.Types.ObjectId, ref: 'Participant'}],

});

module.exports = mongoose.model('companies', companySchema);

