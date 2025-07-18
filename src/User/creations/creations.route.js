const express = require('express');
const { createACreation, listAllUserCreations, getACreation, getPopularCreations, getRecentFriendsCreations, deleteACreation, updateACreation} = require('./creations.controller');
const { verifyTheUserToken } = require("../../../config/auth/userAuth")
const router = express.Router();

router.post("/creations", verifyTheUserToken, createACreation);

router.get("/creations", verifyTheUserToken, listAllUserCreations);

//home page

router.get("/creations/home", verifyTheUserToken, getPopularCreations);

router.get("/creations/feed",verifyTheUserToken, getRecentFriendsCreations)

router.get("/creations/:creationId", verifyTheUserToken, getACreation);

router.put("/creations/:creationId", verifyTheUserToken, deleteACreation);

router.put("/creations/:creationId/edit", verifyTheUserToken, updateACreation);


module.exports = router;