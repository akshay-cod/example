const express = require('express');
const router = express.Router();

const { saveACategory, getCategoryList } = require('./category.controller.js');
const { verifyTheUserToken } = require('../../../config/auth/userAuth');

router.post("/category",verifyTheUserToken, saveACategory)
router.get("/category",verifyTheUserToken, getCategoryList)


module.exports = router;