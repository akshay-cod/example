const express = require('express');
const router = express.Router();

const { saveAnItem, getItemsList } = require('./items.controller.js');
const { verifyTheUserToken } = require('../../../config/auth/userAuth.js');

router.post("/items",verifyTheUserToken, saveAnItem)
router.get("/items",verifyTheUserToken, getItemsList)


module.exports = router;