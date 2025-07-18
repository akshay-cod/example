const { getAUserByUserId, getAUser } = require("../auth/auth.usec.cases");
const UserModalRepository = require("../auth/model/auth.model.repository");
const WalletModelRepository = require("../wallet/model/wallet.model.repository");
const { updateAWalletBalance } = require("../wallet/wallet.use.cases");
const WithdrawelModelRepository = require("./model/withdrawel.model.repository");
const { saveAWithdrawalRequest, getAllWithdrawalRequest } = require("./withdrawel.usecases");

exports.raiseWithdrawalRequest = async (req, res) => {
    try{
        let { type, amount, accounts } = req.body;
        const userRepositoryStorage = new UserModalRepository();
        const withDrawalRepositoryStorage = new WithdrawelModelRepository();
        const walletRepositoryStorage = new WalletModelRepository();
         amount = parseFloat(amount).toFixed(2)
        const foundUserByphoneNumber = await getAUser(userRepositoryStorage, req.user.phoneNumber);
       // console.log(foundUserByphoneNumber)
        if(amount < foundUserByphoneNumber.wallet.wallet_balance){
            const subtractedWalletBalance = await updateAWalletBalance(
               walletRepositoryStorage,
               req.user.userId,
               -amount
            )
            if(subtractedWalletBalance){
            const savedWithdrawal = await saveAWithdrawalRequest(
                {
                    withDrawalRepositoryStorage:withDrawalRepositoryStorage,
                    amount:amount,
                    type:type,
                    userId:req.user.userId,
                    accounts:accounts
                })
                res.status(200).json({ status: true, withdraw: savedWithdrawal });
            }
        
        }
        else{
            res.status(400).json({ status: false, message: "insuffient amount" });
        }
        
    }
    catch(err){

    }
}

exports.listWithdrawalRequest = async (req, res) => {
    try{
        const withDrawalRepositoryStorage = new WithdrawelModelRepository();
        const {skip} = req.query;
        const gotAllWithdrawals = await getAllWithdrawalRequest({withDrawalRepositoryStorage:withDrawalRepositoryStorage, userId:req.user.userId, skip:skip*10});
        res.status(200).json({ status: true, withdrawals: gotAllWithdrawals });
    }
    catch(err){

    }
}