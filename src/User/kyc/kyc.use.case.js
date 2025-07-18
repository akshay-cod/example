exports.saveAKycData = async ({
    KycRepositoryStorage, 
    user,
    documentImage,
    documentNumber}) =>{
    try{
        const savedKycData = await KycRepositoryStorage.save(
            {
                user: user,
                document_image:documentImage,
                document_number:documentNumber,
            }
        )

        return savedKycData
    }
    catch(err){

    }
}



exports.getAKycData = async ({
    KycRepositoryStorage, 
    user
}) =>{
    try{
        const searchedKycData = await KycRepositoryStorage.findOne(
            {
                user: user
            },
        )

        return searchedKycData
    }
    catch(err){

    }
}

exports.updateAKycData = async ({
    KycRepositoryStorage, 
    user,
    documentImage,
    documentNumber
}) =>{
    try{
        const updatedKycData = await KycRepositoryStorage.updateOne(
            {
                user: user
            },
            {
                document_image:documentImage,
                document_number:documentNumber,
            }
        )

        return updatedKycData
    }
    catch(err){
        
    }
}