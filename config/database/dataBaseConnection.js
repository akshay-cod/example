// Require external modules
const mongoose = require('mongoose')

exports.connectToMongodb = async () =>
{ 
    try{
        await mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected…")
    }
    catch(err){
        console.log(err)
    }
}