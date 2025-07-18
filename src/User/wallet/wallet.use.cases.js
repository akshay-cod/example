exports.getAnuserWallet = async (WalletModelRepository, userId) => {
    try{
        const gotTheUser = await WalletModelRepository.findOne(
            {
                user:userId
            }
        )
        return gotTheUser;
    }
    catch(err){

    }
}

exports.createAWallet = async (WalletModelRepository, userId) => {
    try{
        const savedPurchase = await WalletModelRepository.save({
            user:userId,
            wallet_balance:0,
            purchases:0,
            sold:0,
            types_of_creations:{
                video:0,
                image:0,
                audio:0,
                document:0,
                any:0,
                file:0
            }
        })
        return savedPurchase;
    }
    catch(err){

    }
}

exports.updateAWalletBalance = async (WalletModelRepository, user, walletBalance) => {
    try{
        const updatedWalletBalance = await WalletModelRepository.updateOne(
            {user:user},
            {$inc: { wallet_balance:walletBalance } })
        return updatedWalletBalance;
    }
    catch(err){

    }
}


exports.increaseASoldCount = async (WalletModelRepository, user) => {
    try{
        const updatedSold = await WalletModelRepository.updateOne(
            {user:user},
            { $inc:{sold:1}})
        return updatedSold;
    }
    catch(err){

    }
}

exports.increaseAPurchaseCount = async (WalletModelRepository, user) => {
    try{
        const updatedPurchase = await WalletModelRepository.updateOne(
            {user:user},
            { $inc:{purchases:1}})
        return updatedPurchase;
    }
    catch(err){

    }
}

exports.increaseATypeOfCreations = async (WalletModelRepository, user, type) => {
    try{
        const increasedATypeOfCreations = await WalletModelRepository.updateOne(
            {user:user},
            type == "video" ?
            { $inc:{"types_of_creations.video":1}}
            : type == "image" ?
            { $inc:{"types_of_creations.image":1} }
            : type == "audio" ?
            { $inc:{"types_of_creations.audio":1} }
            : type == "document" ?
            { $inc:{"types_of_creations.document":1} }
            : type == "any" ?
            { $inc:{"types_of_creations.any":1} }
            : type == "file" ?
            { $inc:{"types_of_creations.file":1} }
            :{}
            )
        return increasedATypeOfCreations;
    }
    catch(err){

    }
}

// wallet_balance:0,
// purchases:0,
// sold:0,
// types_of_creations:{
//     video:0,
//     image:0,
//     audio:0,
//     document:0,
//     any:0,
//     file:0
// }