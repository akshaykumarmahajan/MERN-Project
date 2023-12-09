const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:                      {type: String, required: true },
    lastname:                       {type: String, required: true },
    username:                       {type: String, default: ''},    
    email:                          {type: String, lowercase: true, required: true, unique: true },
    password:                       {type: String, required: true },
    phone_number:                   {type: String, default: ''},
    profile_pic:                    {type: String, default: '' },
    address:                        {type: String, default: '' },
    city:                           {type: String, default: '' },
    state:                          {type: String, default: '' },
    zipcode:                        {type: String, default: '' },
    country:                        {type: String, default: '' },
    uniqueId:                       {type: String, default: '' },
    gender:                         {type: String, default: ''},
    dob:                            {type: Date,   default: '' },    
    joinDate:                       {type: Date,   default: Date.now },
    status:                         {type: String, default: 1},       //0-InActive, 1-Active, 2- Deactive
    deleted:                        {type: Boolean, default: false},
    userType:                       {type: String, enum: ['User', 'Admin'], default: 'User'},
    is_email_verified:              {type: Boolean, default: true},

}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);
module.exports = User;