const { saveAKycData, updateAKycData, getAKycData } = require("./kyc.use.case");
const KycModelRepository = require("./model/kyc.model.repository");

exports.addKyc = async (req, res) =>{
    try{
        const kycRepositoryStorage = new KycModelRepository();
    //   console.log(req.body)
        const savedKyc = await saveAKycData({
              KycRepositoryStorage:kycRepositoryStorage, 
              user:req.user.userId,
              documentImage:req.body.documentImage,
              documentNumber:req.body.documentNumber,
            })
        
        res.status(200).json({ status: true, saved: savedKyc });
    }
    catch(err){

    }
}

exports.getKyc = async (req, res) =>{
    try{
        const kycRepositoryStorage = new KycModelRepository();
       
        const savedKyc = await getAKycData({
              KycRepositoryStorage:kycRepositoryStorage, 
              user:req.user.userId,
            })
        if(savedKyc){
            res.status(200).json({ status: true, kyc: savedKyc });
        }
       else{
        res.status(200).json({ status: true, kyc: "" });
       }
    }
    catch(err){

    }
}

exports.updateKyc = async (req, res) =>{
    try{
        const kycRepositoryStorage = new KycModelRepository();
       
        const updatedKyc = await updateAKycData({
              KycRepositoryStorage:kycRepositoryStorage, 
              user:req.user.userId,
              documentImage:req.body.documentImage,
              documentNumber:req.body.documentNumber,
            })
        
        res.status(200).json({ status: true, saved: updatedKyc });
    }
    catch(err){

    }
}