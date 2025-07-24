const express = require('express');
const router = express.Router();

const { saveAnItem, getItemsList,getAnItem,getTrendingItemsList } = require('./items.controller.js');
const { verifyTheUserToken } = require('../../../config/auth/userAuth.js');
const userReviewsModel = require('../user-reviews/model/user-reviews.model.js');

router.post("/items",verifyTheUserToken, saveAnItem)
router.get("/items/trending",verifyTheUserToken, getTrendingItemsList)
router.get("/items",verifyTheUserToken, getItemsList)
router.get("/items/:itemId",verifyTheUserToken, getAnItem)
// router.put("/items/:id",verifyTheUserToken, updateAnItem)


module.exports = router;