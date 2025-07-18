const { saveFriend, getFriends } = require("./friends.use.cases");
const FriendsModelRepository = require("./model/friends.model.repository");

exports.saveAFriend = async (req, res) =>{
    try{
        const friendsRepositoryStorage = new FriendsModelRepository();
       
        const savedFriend = await saveFriend(friendsRepositoryStorage, req.user.userId, req.body.user)
        
        res.status(200).json({ status: true, created: savedFriend });
    }
    catch(err){

    }
}

exports.getAllFriends = async (req, res) => {
    try{
        const { skip } = req.query;
        const friendsRepositoryStorage = new FriendsModelRepository();
       
        const gotFriends = await getFriends(friendsRepositoryStorage, req.user.userId,skip*10)
        
        res.status(200).json({ status: true, friends: gotFriends, user:req.user.userId });
    }
    catch(err){

    }
}