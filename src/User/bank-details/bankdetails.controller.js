const PaymentService = require("../../../services/payment/paymentService");
const { saveAnCustomerBankDetails, getAnCustomerBankDetails, updateAnCustomerBankDetails } = require("./bankdetails.use.cases");
const BankDetailsModelRepository = require("./model/bankdetails.model.respository");

exports.addACustomerBankDetails = async (req, res) => {
    try {
        
        const {accountDetails , upi } = req.body
        let customerId;

        const bankDetailsRepositoryStorage = new BankDetailsModelRepository();
        
        const getAUserBankDetails = await getAnCustomerBankDetails({
            BankDetailsModelRepository:bankDetailsRepositoryStorage,
            user:req.user.userId
        })

        if(getAUserBankDetails){
            const updatedBankDetails = await updateAnCustomerBankDetails({
                BankDetailsModelRepository:bankDetailsRepositoryStorage,
                user:req.user.userId,
                upiDetails:upi,
                bankAccount:accountDetails
            })
        }
        else
        {
            //console.log("here")
        const savedBankDetails = await saveAnCustomerBankDetails({
            BankDetailsModelRepository:bankDetailsRepositoryStorage,
            user:req.user.userId,
            upiDetails:upi,
            bankAccount:accountDetails
        })
    }

       // const paymentServiceRef = new PaymentService();
        // if(false){

        // }
        // else{
        //     const response = await paymentServiceRef.addCustomer({
        //         email:email,
        //         contact:req.user.phone,
        //         name:accountHolderName,
        //         notes:{
        //             note:"added as a customer"
        //         }
        //     })
        //     customerId = response.id
        // }
        
       

        // const addedBankDetails = await paymentServiceRef.createVirtualAccount(
        //     {
        //         account_holder_name:accountHolderName,
        //         account_number:accountNumber,
        //         cust_id:customerId,
        //         ifsc:ifsc,
        //         type:"bank"
        //     }
        // )
      //  console.log(getAUserBankDetails)
        res.status(200).json({ status: true, savedDetails: true });
    }
    catch (err) {

    }
}

exports.CustomerBankDetails = async (req, res) => {
    try {

        const bankDetailsRepositoryStorage = new BankDetailsModelRepository();
        const getAUserBankDetails = await getAnCustomerBankDetails({
            BankDetailsModelRepository:bankDetailsRepositoryStorage,
            user:req.user.userId
        })

        res.status(200).json({ status: true, bankDetails: getAUserBankDetails });
    }
    catch (err) {

    }
}