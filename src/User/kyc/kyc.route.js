const express = require('express');
const { verifyTheUserToken } = require("../../../config/auth/userAuth");
const { addKyc, getKyc, updateKyc } = require('./kyc.controller');
const router = express.Router();

router.post("/kyc", verifyTheUserToken, addKyc)

router.get("/kyc", verifyTheUserToken, getKyc)

router.put('/kyc', verifyTheUserToken, updateKyc)

module.exports = router;