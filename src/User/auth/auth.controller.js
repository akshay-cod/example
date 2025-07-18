const boom = require("boom");

const CommissionModelRepository = require("../commission/model/commission.model.repository");
const SmsService = require("../../../services/sms/SmsService");
const HashService = require("../../../services/hash/HashService");

const CreationsModelRepository = require("../creations/model/creations.model.repository");
const UserModalRepository = require("./model/auth.model.repository");

const { OTP_EXPIRE_TIME_IN_MINS } = require("../../../config/constants");
const { hashTheOTPContents, checkForHashedOTPMatch } = require("../../Common/use-cases/HashUseCases");

const { getAUser, saveAUser, updateuserDetails, searchUsersInList, getAUserByUserId, getAUserByUserName } = require("./auth.usec.cases");
const { LoginUserAndGenerateToken } = require("../../../config/auth/userAuth");
const { listUserCreations } = require("../creations/creations.use.cases");
const { isValidObjectId } = require("../../../config/common/validators/auth.validator");
const PurchasesModelRepository = require("../purchases/model/purchases.model.repository");
const { getAPurchaseByProfile } = require("../purchases/purchases.use.cases");

exports.sendAnOTPForUser = async (req, res) => {
    try {
     
      const [countryCode, phoneNumber ] = req.body.phoneNumber.split(".");
      //console.log(phoneNumber)

      const smsService = new SmsService();
      const hashServiceRef = new HashService();

      const userRepositoryStorage = new UserModalRepository();

      const findUserByNumber = await getAUser(userRepositoryStorage, phoneNumber);
      // console.log(findUserByNumber,"check")
      if(!findUserByNumber){
         const savedUser = await saveAUser(
          {
            userRepositoryStorage:userRepositoryStorage,
            phoneNumber:phoneNumber,
            countryCode:countryCode
          });
        // console.log(savedUser,"check")
      }
  
      const otp = await hashServiceRef.genrateOTP();
      console.log(otp, "otp")
      const hashedOTPContents = await hashTheOTPContents(hashServiceRef, phoneNumber, otp, OTP_EXPIRE_TIME_IN_MINS);
       const sentSms = true || smsService.sendOTP(otp,phoneNumber)
      if(sentSms){
       //  const sendAnOTPToUser = await smsServiceRef.sendAMessage(`+91${phoneNumber}`,`your OTP for Travel Tales is ${otp}`);
        //console.log(otp,phoneNumber,"otp")
         if(true)
         { 
          // const encryptedRes= hashServiceRef.encryptJson(hashedOTPContents)
          // const decryptedRes = hashServiceRef.decryptJson(encryptedRes.encryptedData, encryptedRes.iv)
          return res.status(200).json(
            { status:true, ginger:hashedOTPContents} 
         )
            
            }
         else
         { 
           return { status:false }
         }
      }
      else{
        return { status:false }
      }
    } catch (err) {
      return res.status(200).json(
        { status:false } )
     // throw boom.boomify(err);
    }
  };

  exports.verifyAnOTPForUser = async (req, res) => {
    try {
      const {otp, ginger, phoneNumber} = req.body;
      const [h_otp, expires] = ginger.split('.');
  
      const hashServiceRef = new HashService();
      const userRepositoryStorage = new UserModalRepository();
     
     // console.log("passed")
      if(Date.now() > expires)
      {
        return res.status(400).json({message:"OTP expired"})
      }
    //  console.log("passed")
      const verifedOTP = await checkForHashedOTPMatch(hashServiceRef, h_otp, phoneNumber, otp, expires);
   //  console.log("passed")
      if(verifedOTP){
          const findUserByNumber = await getAUser( userRepositoryStorage , phoneNumber)
          const payload = {
             userId: findUserByNumber._id,
             phoneNumber:findUserByNumber.phone_number 
            }
          if(findUserByNumber?.email) payload.email = findUserByNumber.email;
          if(findUserByNumber?.first_name) payload.userFullname = findUserByNumber?.first_name+" "+findUserByNumber?.last_name
         
          const token = await LoginUserAndGenerateToken(payload);
          return  res.status(200).json({token, user: findUserByNumber })
      }
      else
      {
        return  res.status(200).json( {message : "invalid OTP"});
      }
  
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  exports.getUserProfileDetails = async (req, res) => {
    try{
      const userRepositoryStorage = new UserModalRepository();
     // console.log(req.user)
      const foundUserByNumber = await getAUser(userRepositoryStorage, req.user.phoneNumber);
      return  res.status(200).json( {profile : foundUserByNumber});
    }
    catch(err){

    }
  }

  exports.searchAnUser = async (req, res) => {
    try{
     // console.log(req.params.userName)
      const userRepositoryStorage = new UserModalRepository();
      const searchKey = req.params.userName === '""' ? "" : req.params.userName ;
    //  console.log(req.params.userName, searchKey)
      const foundUserList = await searchUsersInList(userRepositoryStorage, searchKey, req.user.userId)
      return  res.status(200).json( {users : foundUserList});
    }
    catch(err){
      console.log(err)
    }
}

exports.getUserDetails = async (req, res) => {
  try{
    const {skip} = req.query
    const userRepositoryStorage = new UserModalRepository();
    const creationRepositoryStorage = new CreationsModelRepository();
    const purchasedRepositoryStorage = new PurchasesModelRepository();
   // console.log(req.params,"params")
    let isValidId = isValidObjectId(req.params.userId)
    const foundUserByUserId = await getAUserByUserId(userRepositoryStorage, req.params.userId, req.user.userId, isValidId);
    
    const isPurchasableProfile = foundUserByUserId[0].is_purchasable_profile
   // console.log(isPurchasableProfile,foundUserByUserId,"found")
    let listedUserCreations = []
    let foundUserPurchse = ""
    if(isPurchasableProfile == true){
      foundUserPurchse = await getAPurchaseByProfile(purchasedRepositoryStorage, foundUserByUserId[0]._id, req.user.userId)
      if(foundUserPurchse ||  foundUserByUserId[0]._id == req.user.userId){
      //  listedUserCreations = []
        listedUserCreations =  await listUserCreations(creationRepositoryStorage, foundUserByUserId[0]._id, skip*10)
      }
      else{
        listedUserCreations = []
      }
    }
    else
    {
      listedUserCreations = await listUserCreations(creationRepositoryStorage, foundUserByUserId[0]._id, skip*10)
    }
   // console.log(foundUserPurchse)
    return res.status(200).json( {user : [{...foundUserByUserId[0],is_user_purchased_profile: foundUserPurchse ? true : isPurchasableProfile == false ?  true : foundUserByUserId[0]._id == req.user.userId ? true : false, is_owner: foundUserByUserId[0]._id == req.user.userId ? true : false}] , user_creations:listedUserCreations });
  }
  catch(err){

  }
}

exports.getAnUserDetailsWithNoauth = async (req, res) =>{
  try{
     const userRepositoryStorage = new UserModalRepository();
     let isValidId = isValidObjectId(req.params.userId)
     const foundUserByUserId = await getAUserByUserId(userRepositoryStorage, req.params.userId, "", isValidId);
    return res.status(200).json({user:[{...foundUserByUserId[0], is_user_purchased_profile:false}]})
  }
  catch(err){

  }
}

exports.updateTheUserDetails = async (req,res) => {
  try{
        const userRepositoryStorage = new UserModalRepository();
        const { firstName,
          lastName,
          email,
          profilePicture,
          userName,
          bio,
          links,
          isPurchasableProfile,
          bannerImage,
          setProfilePrice,
          price
        } = req.body;
        let userNameDuplicate = false;
          if(userName){
           const res = await getAUserByUserName(userRepositoryStorage, userName);
         //  console.log(userName)
           if(res) userNameDuplicate = true;
          }
          if(userNameDuplicate){
            return res.status(400).json( { message:"duplicate username", status:false });
          }
        const updatedUser = await updateuserDetails(userRepositoryStorage, req.user.userId, "", "", profilePicture,firstName,lastName,email,userName,isPurchasableProfile,bio,links,bannerImage,setProfilePrice,price)
        return res.status(200).json( { user_creations:updatedUser });
      }
  catch(err){

  }
}

exports.toggleThePurchasableProfile = async (req,res) => {
  try{
        const userRepositoryStorage = new UserModalRepository();
        const {isPurchasableProfile} = req.body;
        const updatedUser = await updateuserDetails(userRepositoryStorage, req.user.userId, "", "", "","","","","",isPurchasableProfile)
        return res.status(200).json( { user_creations:updatedUser });
      }
  catch(err){

  }
}