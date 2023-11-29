const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:                      {type: String, required: true },
    lastname:                       {type: String, required: true },
    username:                       {type: String, default: ''},    
    email:                          {type: String, lowercase: true, required: true, unique: true },
    password:                       {type: String, required: true },
    phone_number:                   {type: String},
    profile_pic:                    {type: String, default: '' },
    address_line_1:                 {type: String, default: null },
    address_line_2:                 {type: String, default: null },
    city:                           {type: String, default: null },
    state:                          {type: String, default: null },
    zipcode:                        {type: String, default: '' },
    country:                        {type: String, default: null },
    uniqueId:                       {type: String, default: null },
    gender:                         {type: String, default: ''},
    dob:                            {type: Date,   default: null },    
    joinDate:                       {type: Date,   default: Date.now },
    status:                         {type: String, default: 1},       //0-InActive, 1-Active, 2- Deactive
    deleted:                        {type: Boolean, default: false},
    userType:                       {type: String, enum: ['User', 'Partner'], default: 'User'},
    is_email_verified:              {type: Boolean, default: true},

}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);
module.exports = User;