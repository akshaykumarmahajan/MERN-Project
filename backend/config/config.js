const path = require('path');

const envFileName = process.env.NODE_ENV ? `../../.env.${process.env.NODE_ENV}`: '../.env';

require("dotenv").config({
    path:path.join(__dirname,envFileName)
});


const serverConfig = {
    PORT : process.env.PORT,
    MONGOOSE :{
        url : process.env.DATABASE_URL,  
        options:{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        } 
    },

JWT_SECRET_KEY:   process.env.JWT_SECRET_KEY, 
}

module.exports = serverConfig