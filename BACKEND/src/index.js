const express = require('express'); //llamamos a Express
const mongoose = require('mongoose'); 
require('dotenv').config();
const companyRoutes = require('./routes/company');
const eventRoutes = require('./routes/event');
const participantRoutes = require('./routes/participant');
// import eventsRoutes from './routes/events';
// import participantsRoutes from './routes/participants';

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use('/api', companyRoutes);
app.use('/api', participantRoutes);
app.use('/api', eventRoutes);

//routes
app.get('/', (req,res) => {
    res.send("Welcome to the API");
});

mongoose.connect(
    process.env.MONGODB_URI
)
.then(()=> console.log("Connected to MongoDB Atlas"))
.then((e)=> console.log(e))


app.listen(port, ()=>{
    console.log(`Server on PORT ${port}` );
});

