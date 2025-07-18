
exports.saveACreation = async (creationModalRepository,title,description,bannerImg,price,type,files,createdBy) => {
    try{
        const savedCreation = await creationModalRepository.save(
           { title:title ,
            type:type ,
            description:description,
            banner_img:bannerImg,
            price:price ,
            files:files ,
            purchase_count:0,
            created_by:createdBy}
        );
        return savedCreation;
    }
    catch(err){
        return err;
    }
}


exports.updateACreationWithId = async ({creationModalRepository,creationId,title,description,bannerImg,price,type,files}) => {
    try{
        const savedCreation = await creationModalRepository.updateOne(
            {
                _id:creationId
            },
           { title:title ,
            type:type ,
            description:description,
            banner_img:bannerImg,
            price:price ,
            files:files }
        );
        return savedCreation;
    }
    catch(err){
        return err;
    }
}

exports.listUserCreations = async (creationModalRepository, userId, skip) => {
    try{
        const listedCreations = await creationModalRepository.list(
            { created_by: userId}, "", skip, "", "created_by"
         );
         return listedCreations;
    }
    catch(err){
        return err
    }
}

exports.getACreation = async(creationModalRepository, creationId) => {
    try{
        const singleCreation = await creationModalRepository.findOne(
            {_id:creationId}, "created_by"
        )
        return singleCreation;
    }
    catch(err){
        return err
    }
}

exports.updatePurchaseCount = async (creationModalRepository, creationId) => {
    try{    
         const increasedPurchasedCount = await creationModalRepository.updateOne({_id: creationId}, {$inc: { purchase_counts: 1}});
         if(increasedPurchasedCount){
            return true
         }
         else{
            return false
         }
       
    }
    catch(err){
        return false
    }
}

exports.listPopularCreations = async (creationModalRepository) => {
    try{    
         const listedPopularCreations = await creationModalRepository.list({},{purchase_counts:-1},"", "", 
            {path:"created_by",
             populate:{path:"wallet"}}
         );
         if(listedPopularCreations){
            return listedPopularCreations
         }
         else{
            return false
         }
       
    }
    catch(err){
        console.log(err)
        return false
    }
}

exports.listRecentCreationsOfFriends = async (creationModalRepository, userIds, skip) => {
    try{
        const listedRecentCreationsOfFriends = await creationModalRepository.list({
            created_by:{$in: [...userIds]}
        },"", skip,"")
        return listedRecentCreationsOfFriends;
    }
    catch(err){

    }
}

exports.removeACreation = async (creationModalRepository, postId) => {
    try{
        const removedCreation = await creationModalRepository.deleteOne({
           _id:postId
        })
        return removedCreation;
    }
    catch(err){

    }
}