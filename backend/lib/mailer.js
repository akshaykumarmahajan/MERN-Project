const nodemailer = require("nodemailer");
const ejs = require("ejs") 
const path = require("path") 


let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const sendMail = async(filename, receipent, subject, mailbody) =>{
    try{
        ejs.renderFile(path.join(__dirname,filename), {mailbody},(err,data)=>{
            if(err){console.log(err)}
            else{
                let mailOption = {
                    from: process.env.EMAIL_FROM,
                    to: receipent,
                    subject: subject,
                    html: data
                }
                transporter.sendMail(mailOption, (error, res)=>{
                    if(error){
                        console.log(error);
                        return error
                    }
                    else{
                        console.log('Message sent: %s', res.messageId)
                    }
                })
            }
        })

    }catch(error){

    }

}

module.exports = {sendMail}
