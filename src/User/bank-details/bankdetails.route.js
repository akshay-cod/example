const express = require('express');
const { addACustomerBankDetails, CustomerBankDetails } = require('./bankdetails.controller');
const { verifyTheUserToken } = require('../../../config/auth/userAuth');
const router = express.Router();

router.post("/add/bank-details",verifyTheUserToken, addACustomerBankDetails)

router.get("/get/bank-details",verifyTheUserToken, CustomerBankDetails)

module.exports = router;