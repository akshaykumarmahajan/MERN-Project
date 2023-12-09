const STATUS = {
    "success": "success",
    "failed":"failed"
}

const MESSAGE = {
    "loginSuccess"                  : "Logged in successfully",
    "signupSuccess"                 : "Signup successfully, please check you email to activate your account",
    "passandconfirmpass"            : "Password and confirm password doesn't match",
    "newpassandconfirmpass"         : "New Password and confirm password doesn't match",
    "dataRetrievedSuccess"          : "Data retrieved successfully",
    "imageUpdateSuccess"            : "Image updated successfully",
    "userNotFound"                  : "User not found",
    "profileUpdatedSuccess"         : "Profile updated successfully",
    "userUpdatedSuccess"            : "User updated successfully",
    "unableUserUpdated"             : "Unable to update user",
    "unablePasswordUpdated"         : "Unable to update password",
    "passwordChangedSuccess"        : "Password changed successfully",
    "requiredFieldsMissing"         : "Required fields are missing",
    "emailAlreadyExist"             : "Email already exisit",
    "invalidCredentials"            : "Invalid credentials",
    "userInvalidCurrPass"           : "User not found or invalid current password",
    "unableToRegister"              : "Unable to register",
    "notRegisteredUser"             : "You are not a registered user",
    "unauthorizedUser"              : "Unauthorized user",
    "unableToLogin"                 : "Unable to login",
    "unableToGetUser"               : "Unable to get user detail",
    "unauthorizedUserNoToken"       : "Unauthorized user, no token",
    "somethingWentWrong"            : "Something went wrong"
}


module.exports = {
    STATUS: STATUS,
    MESSAGE: MESSAGE
}