const express = require('express'); //llamamos a Express
const mongoose = require('mongoose'); 
require('dotenv').config();
const companyRoutes = require('./routes/company');
// import eventsRoutes from './routes/events';
// import participantsRoutes from './routes/participants';

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use('/api', companyRoutes);

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
    console.log('Server on http://localhost:3000');
});

