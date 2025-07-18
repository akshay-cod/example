const PurchasesModelRepository = require("./model/purchases.model.repository");
const { listPurchases, listSoldProfile } = require("./purchases.use.cases");

exports.handleWebHook = async (req, res) => {
    try{

    }
    catch(err){
        console.log(err)
    }
}

exports.getAllPurchase = async (req, res) => {
    try{
        const PurchasesModelRepositoryStorage = new PurchasesModelRepository();
        const {skip} = req.query;
        console.log(skip)
        const gotAllPurchase = await listPurchases(PurchasesModelRepositoryStorage, req.user.userId, skip*10);
        res.status(200).json({ status: true, purchases: gotAllPurchase });
    }
    catch(err){

    }
}

exports.getAllSellings = async (req, res) => {
    try{
        const PurchasesModelRepositoryStorage = new PurchasesModelRepository();
        const {skip} = req.query;
        console.log(skip)
        const gotAllSold = await listSoldProfile(PurchasesModelRepositoryStorage, req.user.userId, skip*10, "purchase_history commisson purchased_user owner profile product");
        res.status(200).json({ status: true, sellings: gotAllSold });
    }
    catch(err){

    }
}