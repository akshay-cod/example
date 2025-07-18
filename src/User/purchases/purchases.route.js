const express = require('express');
const { verifyTheUserToken } = require('../../../config/auth/userAuth');
const { getAllPurchase, getAllSellings } = require('./purchases.controller');
const router = express.Router();

router.get("/user/purchases", verifyTheUserToken, getAllPurchase)

router.get("/user/sold", verifyTheUserToken, getAllSellings)

module.exports = router;