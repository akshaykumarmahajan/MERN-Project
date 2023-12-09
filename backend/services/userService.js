const User = require("../models/User");
const bcrypt = require("bcrypt");
const {STATUS, MESSAGE}= require('../lib/constants')  

const getUserDetail = async (req, res) => {
  if (!req.user._id) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.userNotFound });
  } else {
    try {
      const user = await User.findOne({ _id: req.user._id }, { password: 0 });
      if (user) {
        res.status(201).send({status: STATUS.success, message: MESSAGE.dataRetrievedSuccess, data: user});
      } else {
        res.status(401).send({ status: STATUS.failed, message: MESSAGE.userNotFound });
      }
    } catch (error) {
      res.status(404).send({status: STATUS.failed,message: MESSAGE.unableToGetUser, error: error,});
    }
  }
};

const updateUserDetail = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.requiredFieldsMissing});
  } else {
    try {
      const {firstname, lastname, phone_number, gender, dob, address, country, state, city } = req.body;

      const updateUser = await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            gender: gender,
            dob: dob,
            address: address,
            country: country,
            state: state,
            city: city,
          },
        },
        { new: true }
      );

      if (updateUser) {
        res.status(201).send({status: STATUS.success, message: MESSAGE.profileUpdatedSuccess, data: updateUser});
      } else {
        res.status(404).send({ status: STATUS.failed, message: MESSAGE.unableUserUpdated });
      }
    } catch (error) {
      res.status(404).send({status: STATUS.failed, message: MESSAGE.somethingWentWrong, error: error});
    }
  }
};

const changeUserPassword = async (req, res) => {
  if (!req.body.current_password || !req.body.new_password || !req.body.confirm_password) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.requiredFieldsMissing });
  } else {
    try {
      const { current_password, new_password, confirm_password } = req.body;
      if (new_password !== confirm_password) {
        res.status(401).send({ status: STATUS.failed, message: MESSAGE.newpassandconfirmpass});
      } else {
        const user = await User.findById(req.user._id).select("+password");
        const userVerified = await bcrypt.compare(current_password,user.password );
        if (!user || !userVerified) {
          res.status(401).send({status: STATUS.failed, message: MESSAGE.userInvalidCurrPass });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(new_password, salt);
          const updatePass = await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword }});
          if (updatePass) {
            res.status(201).send({status: STATUS.success, message: MESSAGE.passwordChangedSuccess});
          } else {
            res.status(404).send({status: STATUS.failed, message: MESSAGE.unablePasswordUpdated});
          }
        }
      }
    } catch (error) {
      res.status(404).send({status: STATUS.failed, message: MESSAGE.unableToGetUser, error: error});
    }
  }
};

const updateProfileImage = async (req, res) => {
  if (!req.file) {
    res.status(401).send({ status: STATUS.failed, message: MESSAGE.imageRequired });
  } else {
    try {
      const imageUpdate = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { profile_image: req.file.filename } },
        {new: true}
      );
      if (imageUpdate) {
        res.status(201).send({status: STATUS.success,message: MESSAGE.imageUpdateSuccess });
      } else {
        res.status(404).send({ status: STATUS.failed,  message: MESSAGE.unableImageUpdated });
      }
    } catch (error) {
      res.status(404).send({ status: STATUS.failed, message: MESSAGE.somethingWentWrong,error: error });
    }
  }
};

module.exports = {
  getUserDetail,
  updateUserDetail,
  changeUserPassword,
  updateProfileImage
};
