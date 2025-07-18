exports.saveCommision = async(commisionModalRepository, userId) => {
    try{
        const savedCommision = await commisionModalRepository.save(
            {user:userId}
        )
        return savedCommision;
    }
    catch(err){
        return err
    }
}

exports.getAnUserCommission = async (commisionModalRepository, userId) => {
    try{
        const userCommissionDetails = await commisionModalRepository.findOne(
            {user:userId}
        )
        return userCommissionDetails;
    }
    catch(err){

    }
}