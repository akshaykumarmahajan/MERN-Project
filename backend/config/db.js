const mongoose = require('mongoose');

const connectDB = async(DATABASE_URL) =>{
    try{
        const DB_OPTIONS = {
            dbName : "reactbackend"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("DB Connected Successfully...")
    }
    catch(error){

    }
}

module.exports = connectDB;