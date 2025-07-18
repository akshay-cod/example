const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { sendAnOTPForUser, verifyAnOTPForUser, getUserProfileDetails, searchAnUser, getUserDetails, updateTheUserDetails, toggleThePurchasableProfile, getAnUserDetailsWithNoauth } = require('./auth.controller');
const { verifyTheUserToken } = require('../../../config/auth/userAuth');
const { authLoginValidator, validateAuthLogin, isValidateAuthLogin, validateAuthVerify, validateUserProfile } = require('../../../config/common/validators/auth.validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }, 
  })

const upload = multer({storage: storage, limits:{fileSize:1000000000 * 5}});

router.post('/upload-single-file',upload.single('file'),(req,res)=>{
   // console.log(req.file)
    res.status(200).json({
       url:req.file.filename,
       type:req.file.mimetype,
       size:req.file.size
    });
});

router.post('/otp',validateAuthLogin, isValidateAuthLogin, sendAnOTPForUser);

router.post('/verify-otp',validateAuthVerify,isValidateAuthLogin, verifyAnOTPForUser)

router.get("/user-profile-details", verifyTheUserToken, getUserProfileDetails)

router.get("/users/:userName",verifyTheUserToken, searchAnUser)


module.exports = router;