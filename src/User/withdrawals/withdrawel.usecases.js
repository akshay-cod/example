exports.saveAWithdrawalRequest = async ({withDrawalRepositoryStorage,userId, amount, type,accounts}) => {
    try{
        const withdrawalSaved = await withDrawalRepositoryStorage.save({
            user:userId,
            requested:true,
            is_processed:false,
            type:type,
            amount:amount,
            accounts:accounts
        });
        return withdrawalSaved;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

exports.getAllWithdrawalRequest = async ({withDrawalRepositoryStorage,userId,skip}) => {
    try{
        const withdrawalListed = await withDrawalRepositoryStorage.list({
            user:userId
        },"", skip, "", "user accounts");
        return withdrawalListed;
    }
    catch(err){
        console.log(err)
        return err;
    }
}