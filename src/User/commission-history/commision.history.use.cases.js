exports.saveCommissionHistory = async (CommissionHistoryModelRepositoryStorage, productId, amount, commissionShare, UserWalletShare, commissionPercentage, userId, owner) => {
    try{
        const savedCommissionHistory = await CommissionHistoryModelRepositoryStorage.save({
            product:productId,
            amount:amount,
            commission_share:commissionShare,
            user_wallet_share:UserWalletShare,
            user:userId,
            owner:owner,
            commission_percentage:commissionPercentage
        })
        return savedCommissionHistory
    }
    catch(err){

    }
}

