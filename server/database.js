const mongoose = require('mongoose');
const MONGO_PASS = process.env.SECRET;
const MONGO_URI =`mongodb://tesisuser:${MONGO_PASS}@ds149056.mlab.com:49056/tesis`;

//Connect to MongoDB
mongoose.connect(MONGO_URI,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb @ 27017');
});
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error '+ err);
    }
});

module.exports = mongoose;