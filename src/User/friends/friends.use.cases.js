exports.saveFriend = async (friendModalRepository, user, friendUser) => {
    try{
        const savedfriend = await friendModalRepository.save({
            friend_requested_user:user,
            users:[user, friendUser]
        })
        return savedfriend
    }
    catch(err){
        console.log(err)
    }
}

exports.checkIsFriend = async (friendModalRepository, user, friendUser) => {
    try{

    }
    catch(err){

    }
}

exports.getFriends = async (friendModalRepository, user, skip) => {
    try{
        const gotFriends = await friendModalRepository.list(
            {
                users:{ $in: [user] }
             },
             "", skip,"", "users"
        )
        return gotFriends;
    }
    catch(err){
        console.log(err)
    }
}