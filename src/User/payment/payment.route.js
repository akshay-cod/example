const express = require('express');
const { verifyTheUserToken } = require("../../../config/auth/userAuth");
const { createAPaymentOrder, verifyAPaymentOrder, handleWebHook } = require('./payments.controller');
const router = express.Router();


router.post("/payment/create-order", verifyTheUserToken, createAPaymentOrder);

router.post("/payment/verify", verifyTheUserToken, verifyAPaymentOrder);

router.post("/payment/web-hook", handleWebHook);


module.exports = router;