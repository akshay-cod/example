exports.getAnCustomerBankDetails = async ({BankDetailsModelRepository, user}) => {
    try{
        const searchedCustomer = await BankDetailsModelRepository.findOne({user:user})
        return searchedCustomer;
    }
    catch(err){

    }
}

exports.saveAnCustomerBankDetails = async ({
     BankDetailsModelRepository,
     user,
     upiDetails,
     bankAccount}) => {
    try{
        const savedCustomer = await BankDetailsModelRepository.save({
            user:user,
            upi:upiDetails,
            bank:bankAccount
        })
        return savedCustomer;
    }
    catch(err){
      console.log(err)
    }
}

exports.updateAnCustomerBankDetails = async ({
    BankDetailsModelRepository,
    user,
    upiDetails,
    bankAccount
  }) => {
    try{
        const updatedCustomer = await BankDetailsModelRepository.updateOne({user:user},{
            bank:bankAccount,
            upi:upiDetails
        })
        return updatedCustomer;
    }
    catch(err){
        console.log(err)
    }
}