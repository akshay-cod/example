const PurchasesModelRepository = require("../purchases/model/purchases.model.repository");
const CreationsModelRepository = require("./model/creations.model.repository");

const { getAPurchase } = require("../purchases/purchases.use.cases");
const { saveACreation, listUserCreations, getACreation, listPopularCreations, listRecentCreationsOfFriends, removeACreation, updateACreationWithId } = require("./creations.use.cases");
const { handleTypeOfCreationsUpdate } = require("./creations-helpers/creations.helpers");
const CacheService = require("../../../services/cache/CacheService");
const FriendsModelRepository = require("../friends/model/friends.model.repository");
const { getFriends } = require("../friends/friends.use.cases");

exports.createACreation = async (req, res) => {
    try {
        const {
            title,
            description,
            bannerImg,
            price,
            type,
            files
        } = req.body;
      //  console.log(req.body)
        const creationRepositoryStorage = new CreationsModelRepository();
       
        const savedCreations = await saveACreation(creationRepositoryStorage, title, description, bannerImg, price, type, files, req.user.userId);
        const handledTypeOfCreations = await handleTypeOfCreationsUpdate( req.user.userId, type)

        res.status(200).json({ status: true, created: savedCreations });
    }
    catch (err) {

    }
}

exports.listAllUserCreations = async (req, res) => {
    try{
        const creationRepositoryStorage = new CreationsModelRepository();
        const { skip } = req.query ;
        console.log(req.query)
        const listedUserCreations = await listUserCreations(creationRepositoryStorage, req.user.userId, skip * 10)
        res.status(200).json({ status: true, creations: listedUserCreations });
    }
    catch(err){

    }
}

exports.getACreation = async (req, res) => {
    try{
      
        const creationRepositoryStorage = new CreationsModelRepository();
        const PurchasesModelRepositoryStorage = new PurchasesModelRepository();
        
        const listedUserCreations = await getACreation(creationRepositoryStorage, req.params.creationId);
       // console.log(listedUserCreations,"iii")
        
       
        if(listedUserCreations.price == 0){
            let freeCreation = {...listedUserCreations._doc}
            freeCreation.is_purchased = true;
            if(listedUserCreations.created_by._id == req.user.userId){
                freeCreation.is_self = true
            }
            else{
                freeCreation.is_self = false
            }
            return res.status(200).json({ status: true, creation: freeCreation });
        }

        const getPurchasedData = await getAPurchase(PurchasesModelRepositoryStorage,req.params.creationId,req.user.userId)
       
        let modifedCreationData = {...listedUserCreations._doc}
        if(getPurchasedData || listedUserCreations.created_by._id == req.user.userId){
            modifedCreationData.is_purchased = true;

        }
        else{
            modifedCreationData.is_purchased = false ;
            delete modifedCreationData.files;
        }
        
        if(listedUserCreations.created_by._id == req.user.userId){
            modifedCreationData.is_self = true
        }
        else{
            modifedCreationData.is_self = false
        }

      //  console.log(modifedCreationData,"purchased")

        res.status(200).json({ status: true, creation: modifedCreationData });
    }
    catch(err){

    }
}

exports.getPopularCreations = async (req, res) => {
    try{

       // const cacheService = new CacheService();
        //const isCached = await cacheService.getKeyValue("home");
        let listedUserCreations;
        if(false)
        {
            listedUserCreations = isCached
        }
        else{
           // console.log("here")
            const creationRepositoryStorage = new CreationsModelRepository();
             listedUserCreations = await listPopularCreations(creationRepositoryStorage);
           //  const setChache = await cacheService.setKeyValue("home", listedUserCreations)
        }
      
        res.status(200).json({ status: true, creations: listedUserCreations });
    }
    catch(err){

    }
}

exports.getRecentFriendsCreations = async (req, res) =>{
    try{
        const { skip } = req.query;
      //  console.log(skip)
        const creationRepositoryStorage = new CreationsModelRepository();
        const friendsRepositoryStorage = new FriendsModelRepository();

        const gotAllFriends = await getFriends(friendsRepositoryStorage, req.user.userId);
        const friendsList = []
        gotAllFriends.map((data)=>{
          data.users.map((data)=>{
            if(data == req.user.userId)
              friendsList.push(data)
          })
        })
       // console.log(friendsList)
        const recentCreationsOfFriends = await listRecentCreationsOfFriends(creationRepositoryStorage, friendsList, skip*10)

        res.status(200).json({ status: true , creations:recentCreationsOfFriends});
    }
    catch(err){
        console.log(err)
        res.status(400).json({ status: false});
    }
}

exports.deleteACreation = async (req, res) => {
    try{
        const {creationId} = req.params

        const creationRepositoryStorage = new CreationsModelRepository();
        
        const deletedCreation = await removeACreation(creationRepositoryStorage, creationId)
        if(deletedCreation){
            res.status(200).json({ status: true });
        }
        else{
            res.status(200).json({ status: false });
        }
        
    }
    catch(err){

    }
}

exports.updateACreation = async (req, res) => {
    try{
        const {creationId} = req.params;
        const {
            title,
            description,
            bannerImg,
            price,
            type,
            files
        } = req.body;
        const creationRepositoryStorage = new CreationsModelRepository();
        
        const updatedCreation = await updateACreationWithId({
        creationModalRepository:creationRepositoryStorage,
        bannerImg:bannerImg,
        creationId:creationId,
        description:description,
        price:price,
        files:files,
        type:type,
        title:title
        } )
        if(updatedCreation){
            res.status(200).json({ status: true });
        }
        else{
            res.status(200).json({ status: false });
        }
        
    }
    catch(err){

    }
}