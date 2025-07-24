const express = require('express');
const router = express.Router();

const { getLastestGoodReviews, saveAReview } = require('./user-reviews.controller');
const { verifyTheUserToken } = require('../../../config/auth/userAuth');

router.get("/reviews/good",verifyTheUserToken, getLastestGoodReviews)
router.post("/reviews",verifyTheUserToken, saveAReview)

module.exports = router;