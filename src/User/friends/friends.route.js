const express = require('express');
const { verifyTheUserToken } = require("../../../config/auth/userAuth");
const { saveAFriend, getAllFriends } = require('./friends.controller');
const router = express.Router();

router.post("/friends/add-friend", verifyTheUserToken, saveAFriend)

router.get("/friends/all-friends", verifyTheUserToken, getAllFriends)

module.exports = router;