const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {STATUS, MESSAGE, MAILSUBJECT, HOSTNAME, USERACTIVATEURL,RESETPASSWORDURL}= require('../lib/constants')  
const mailer = require("../lib/mailer")


const userRegister = async (req, res) => {
  if (!req.body.firstname ||!req.body.lastname || !req.body.email || !req.body.password || !req.body.confirm_password) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.requiredFieldsMissing });
  } else {
    try {
      const { firstname, lastname, email, password, confirm_password } =  req.body;
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        res.status(401).send({ status: STATUS.failed, message: MESSAGE.emailAlreadyExist });
      } else {
        if (password === confirm_password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userObj = {
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashPassword,
              username: firstname + lastname,
            };
            if (req.body.role === "Admin") {
              userObj.role = req.body.role;
            }
            const addUser = await User.create(userObj);
            if (addUser) {
              res.status(201).send({status: STATUS.success,message: MESSAGE.signupSuccess});

              const filename = "../views/emailTemplate/signup.ejs";
              const subject = MAILSUBJECT.welcomeEmail;
              const receipent = email;
              const mailbody = {
                title: 'Welcome Email',
                username: firstname + ' '+ lastname,
                link: `${HOSTNAME}/${USERACTIVATEURL}/?id=${addUser._id}`
              }
              const mailsend =  mailer.sendMail(filename, receipent, subject, mailbody);
              if(mailsend){console.log('Mail Sent')}
              else{console.log('Error:- Mail not send')}
            } else {
              res.status(404).send({ status: STATUS.failed, message: MESSAGE.unableToRegister });
            }
          } catch (error) {
            res.status(404).send({ status: STATUS.failed, message: MESSAGE.unableToRegister });
          }
        } else {
          res.status(401).send({status: STATUS.failed, message: MESSAGE.passandconfirmpass });
        }
      }
    } catch (error) {
      res.status(404).send({ status: STATUS.failed,message: MESSAGE.somethingWentWrong,error: error});
    }
  }
};

const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.requiredFieldsMissing });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email, status: 1, deleted: false });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign( { userID: user._id },process.env.JWT_SECRET_KEY,{ expiresIn: "5d" });
          const data = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: token,
          };
          res.status(201).send({status: STATUS.success,message: MESSAGE.loginSuccess, data: data});
        } else {
          res.status(401).send({ status: STATUS.failed, message: MESSAGE.invalidCredentials });
        }
      } else {
        res.status(401).send({status: STATUS.failed,message: MESSAGE.notRegisteredUser});
      }
    } catch (error) {
      res.status(404).send({ status: STATUS.failed, message: MESSAGE.unableToLogin, error: error });
    }
  }
};

const userActicate = async(req,res) => {
  if(!req.query.id){
    res.status(401).send({ status: STATUS.failed, message: 'userId is required.' });
  }else{
    try{
      const findUser = await User.findOne({_id:req.query.id})
      if(findUser){
        const updtUser = await User.findByIdAndUpdate({_id:req.query.id}, {$set:{status:1}})
        if(updtUser) {
          res.sendFile(process.cwd()+'/views/emailVerified.html')
        }else { 
          res.status(404).send({ status: STATUS.failed, message: 'Unable to activate' });
        }
        
      }else{
        res.status(401).send({ status: STATUS.failed, message: 'You are not registered user.' });
      }
    }catch(error){
      res.status(404).send({ status: STATUS.failed,message: MESSAGE.somethingWentWrong,error: error});
    }
  }
}

const userForgetPassword = async (req, res) => {
  if (!req.body.email) {
    res.status(401).send({ status: STATUS.failed, message: "Email is required" });
  } else {
    try {
      const { email } = req.body;
      const user = await User.findOne({email:email, status:1})
      if(user){
        const secert = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({userId: user._id},secert, {expiresIn:'15m'});
        const filename = "../views/emailTemplate/forgetPassword.ejs";
        const subject = MAILSUBJECT.resetEmail;
        const receipent = email;
        const mailbody = {
          username: user.firstname + ' '+ user.lastname,
          link: `${HOSTNAME}/${RESETPASSWORDURL}/${user._id}/${token}`
        }
        const mailsend =  mailer.sendMail(filename, receipent, subject, mailbody)
        if(mailsend){
          res.status(201).send({status: STATUS.success, message: MESSAGE.resetMailSuccess});
        }else{
          res.status(404).send({status: STATUS.failed, message: MESSAGE.somethingWentWrong, error: error});
        }

        
      }else{
        res.status(401).send({status: STATUS.failed,message: MESSAGE.notRegisteredUser});
      }
    } catch (error) {
      res.status(404).send({status: STATUS.failed, message: MESSAGE.somethingWentWrong, error: error});
    }
  }
};

const userResetPassword = async (req, res) => {
  if (!req.body.password || !req.body.confirm_password || !req.params) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.requiredFieldsMissing });
  } else {
    try {
      const {password, confirm_password} = req.body
      const {id, token} = req.params;
      const user = await User.findOne({_id: id, status: '1'})
      if(user){
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        jwt.verify(token,new_secret)
        if(password === confirm_password){
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password,salt)
          const updateUserPass = await User.findByIdAndUpdate(user._id, {$set:{password: newHashPassword}})
          if(updateUserPass){
            res.status(201).send({status: STATUS.success, message: MESSAGE.passwordChangedSuccess});
          }else{
            res.status(404).send({status: STATUS.failed, message: MESSAGE.unablePasswordUpdated});
          }
        }else{
          res.status(401).send({ status: STATUS.failed, message: MESSAGE.newpassandconfirmpass});
        } 
      }else{
        res.status(401).send({status: STATUS.failed,message: MESSAGE.notRegisteredUser});
      }
    } catch (error) {
      res.status(404).send({status: STATUS.failed, message: MESSAGE.somethingWentWrong, error: error });
    }
  }
};

module.exports = {
  userRegister,
  userLogin,
  userActicate,
  userForgetPassword,
  userResetPassword
};
