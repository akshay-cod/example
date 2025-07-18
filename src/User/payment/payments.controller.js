const HashService = require("../../../services/hash/HashService");
const PaymentService = require("../../../services/payment/paymentService");

const CommissionHistoryModelRepository = require("../commission-history/model/commission.history.model.repository");
const CommissionModelRepository = require("../commission/model/commission.model.repository");
const CreationsModelRepository = require("../creations/model/creations.model.repository");
const PurchasesModelRepository = require("../purchases/model/purchases.model.repository");
const WalletModelRepository = require("../wallet/model/wallet.model.repository");
const PaymentsModelRepository = require("./model/payment.model.repository");

const { saveCommissionHistory } = require("../commission-history/commision.history.use.cases");
const { saveAPurchase } = require("../purchases/purchases.use.cases");
const { getAnUserCommission } = require("../commission/commision.use.cases");
const { getACreation, updatePurchaseCount } = require("../creations/creations.use.cases");
const { updateAWalletBalance } = require("../wallet/wallet.use.cases");
const { saveAnOrder, updateAnOrder, getAnOrder } = require("./payment.use.cases");
const { increaseASoldCount } = require("../wallet/wallet.use.cases");
const { increaseAPurchaseCount } = require("../wallet/wallet.use.cases");

exports.createAPaymentOrder = async (req, res) => {
    try {
        
        const {type, creationId} = req.body
        const paymentServiceRef = new PaymentService();
        const creationRepositoryStrorage = new CreationsModelRepository();
        const PaymentsModelRepositoryStorage = new PaymentsModelRepository();

        
        const searhcedCreation = await getACreation(creationRepositoryStrorage, creationId)
        if(searhcedCreation){
            const createdOrder = await paymentServiceRef.createPaymentOrder( parseInt(searhcedCreation?.price));
            const savedAnOrder = await saveAnOrder(PaymentsModelRepositoryStorage,creationId,createdOrder?.id,searhcedCreation?.price, req.user.userId, searhcedCreation.created_by)
        
            const orderDataModified = {
                currency:"INR",
                description:"payment for the content",
                name:"sell-pixel",
                amount:searhcedCreation?.price * 100,
                order_id:createdOrder?.id,
                user:{
                    email:req?.user?.email,
                    phone:req?.user?.phoneNumber,
                    name:req?.user?.userFullName
                },
                color:"#253341"
            }
            res.status(200).json({ status: true, order: orderDataModified });
        }
        
    }
    catch (err) {

    }
}

exports.verifyAPaymentOrder = async (req, res) => {
    try{
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        const hashServiceRef = new HashService();
        const generatedSignature = await hashServiceRef.deHashData(body)

        let response = {"signatureIsValid":"false"}

        if(generatedSignature === req.body.razorpay_signature){
            response={"signatureIsValid":"true"}
            res.status(200).json((response));
        }
        else{
            res.status(200).json((response));
        }
    }
    catch(err){

    }
}

exports.handleWebHook = async (req, res) => {
    try{
      //  console.log(req.body.payload)
        const paymentStatus = req.body.event;

        const PaymentsModelRepositoryStorage = new PaymentsModelRepository();
        const PurchasesModelRepositoryStorage = new PurchasesModelRepository();
        const CreationModelRepositoryStorage = new CreationsModelRepository();
        const WalletModelRepositoryStorage = new WalletModelRepository();
        const CommissionModelRepositoryStorage = new CommissionModelRepository();
        const CommissionHistoryModelRepositoryStorage = new CommissionHistoryModelRepository();

        const {order_id} = req.body.payload.payment.entity;
        if(paymentStatus === "payment.captured"){
            //handle success
           
            const updatedOrder = await updateAnOrder(PaymentsModelRepositoryStorage, order_id,req.body.payload.payment.entity ,paymentStatus);
            const getTheOrder = await getAnOrder(PaymentsModelRepositoryStorage, order_id);
            const savedAPurchase = await saveAPurchase(PurchasesModelRepositoryStorage, getTheOrder?.product, getTheOrder._id, getTheOrder.created_by);
            const updatedPurchaseCount = await updatePurchaseCount(CreationModelRepositoryStorage, getTheOrder?.product );
            const gotAnUserCommission = await getAnUserCommission(CommissionModelRepositoryStorage, getTheOrder.owner)

            const increasedPurchaseCount = await increaseAPurchaseCount(WalletModelRepositoryStorage,getTheOrder.created_by)
            console.log(increaseAPurchaseCount,"djsdjkasd")
            const increasedSoldCount = await increaseASoldCount(WalletModelRepositoryStorage,getTheOrder.owner)

            const commissionShare = (gotAnUserCommission.commision_percentage/100) 
            const commission = getTheOrder.price * (gotAnUserCommission.commision_percentage/100) 
            const walletBalanceToAdd = Math.ceil(getTheOrder.price - commission)
            
            const savedCommissionHistory = await saveCommissionHistory(CommissionHistoryModelRepositoryStorage, getTheOrder?.product, getTheOrder.price, commission, walletBalanceToAdd, gotAnUserCommission.commision_percentage, getTheOrder.created_by, getTheOrder.owner )
            const updatedWalletBalance = await updateAWalletBalance(WalletModelRepositoryStorage, getTheOrder.created_by, walletBalanceToAdd)
        

            res.status(200).json({ status: true });
        }
        else if(paymentStatus === "payment.authorized"){
            //handle pending
            const updatedOrder = await updateAnOrder(PaymentsModelRepositoryStorage, order_id,req.body.payload.payment.entity ,paymentStatus)
            res.status(200).json({ status: true });
        }
        else if(paymentStatus === "payment.failed"){
            //handle failed
            const updatedOrder = await updateAnOrder(PaymentsModelRepositoryStorage, order_id,req.body.payload.payment.entity ,paymentStatus)
            res.status(200).json({ status: true });
        }
    }
    catch(err){

    }
}