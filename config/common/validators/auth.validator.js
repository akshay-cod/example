const { check, validationResult, body, param } = require('express-validator');

exports.validateAuthLogin = [
    body('phoneNumber')
    .notEmpty()
    .withMessage('phone number is required')
    .custom((data)=>{
        const [countryCode, phoneNumber ] = data.split(".");
       if(phoneNumber.trim().length === 10 && countryCode.trim().length > 1){
        return true
       }
       else{
        return false
       }
    })
    .withMessage("phone number is not valid")
];

exports.isValidateAuthLogin = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0)
    {
        return res.status(400).json({ message: errors.array()[0].msg })
    }
    next();
}

exports.validateAuthVerify = [
    body('phoneNumber')
    .notEmpty()
    .withMessage('phone number is required')
    .custom((data)=>{
       if(data.trim().length === 10){
        return true
       }
       else{
        return false
       }
    })
    .withMessage("phone number is not valid"),
    body('ginger')
    .notEmpty()
    .withMessage("something went wrong")
    .isLength({ min: 20, max:200 })
    .withMessage("something went wrong"),
    body('otp')
    .notEmpty()
    .withMessage("please enter an OTP")
    .isLength(5)
    .withMessage("please enter a valid OTP")
];

exports.validateUserProfile = [
    param('userId')
    .notEmpty()
    .withMessage('id is required')
    .isLength({ min: 3, max:200 })
    .withMessage('invalid id or username')
];


// Requiring ObjectId from mongoose npm package
const ObjectId = require('mongoose').Types.ObjectId;
 
// Validator function
exports.isValidObjectId = (id) => {
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}