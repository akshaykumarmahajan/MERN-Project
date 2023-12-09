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


EMAIL_HOST : process.env.EMAIL_HOST,
EMAIL_SERVICE : process.env.EMAIL_SERVICE,
EMAIL_PORT : process.env.EMAIL_PORT,
EMAIL_USER : process.env.EMAIL_USER,
EMAIL_PASS : process.env.EMAIL_PASS,
EMAIL_FROM : process.env.EMAIL_FROM,

}

module.exports = serverConfig