const mongoose=require("mongoose");
const dns=require("dns");
dns.setServers(['1.1.1.1',
    '8.8.8.8'

]);
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");
        
        // Seed standard algorithmic problems if collection is empty
        const seedDB = require("../utils/seeder");
        await seedDB();
    }
    catch(error){
        console.log("Connection failed");
        console.log(error.message);
        process.exit(1);
    }
}
module.exports=connectDB;