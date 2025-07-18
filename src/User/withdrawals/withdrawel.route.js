const express = require('express');
const { verifyTheUserToken } = require("../../../config/auth/userAuth");
const { raiseWithdrawalRequest, listWithdrawalRequest } = require('./withdrawel.controller');
const router = express.Router();

router.post("/withdrawal/raise", verifyTheUserToken, raiseWithdrawalRequest);

router.get("/withdrawal", verifyTheUserToken, listWithdrawalRequest)

module.exports = router;