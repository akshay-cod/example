exports.getAPurchase = async (PurchasesModelRepository, productId, userId) => {
    try{
        const purchasedProduct = await PurchasesModelRepository.findOne({
            purchased_user:userId,
            product:productId
        })
        return purchasedProduct;
    }
    catch(err){

    }
}

exports.getAPurchaseByProfile = async (PurchasesModelRepository, profileId, userId) => {
    try{
        
        const purchasedProduct = await PurchasesModelRepository.findOne({
            purchased_user:userId,
            profile:profileId
        })
      //  console.log(purchasedProduct,userId,profileId)
        return purchasedProduct;
    }
    catch(err){
        console.log(err)
    }
}

exports.listPurchases = async (PurchasesModelRepository, userId, skip, populate) => {
    try{
        const listedPurchases = await PurchasesModelRepository.list({purchased_user:userId},"", skip, "", populate ? populate :"purchase_history commisson purchased_user owner profile product")
      //  console.log(listedPurchases,"oooo")
        return listedPurchases
    }
    catch(err){
        console.log(err)
    }
}

exports.listSoldProfile = async (PurchasesModelRepository, userId, skip, populate) => {
    try{
       // console.log(userId)
        const listedPurchases = await PurchasesModelRepository.list({owner:userId},"", skip, "", populate ? populate :"purchase_history commisson purchased_user owner profile product")
       // console.log(listedPurchases,"oooo")
        return listedPurchases
    }
    catch(err){
        console.log(err)
    }
}

exports.saveAPurchase = async (PurchasesModelRepository, productId, transactionId, userId) => {
    try{
        const savedPurchase = await PurchasesModelRepository.save({
            purchased_user:userId,
            product:productId,
            purchase_history:transactionId
        })
        return savedPurchase;
    }
    catch(err){

    }
}