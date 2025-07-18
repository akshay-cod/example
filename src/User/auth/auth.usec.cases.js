const IdService = require("../../../services/unique-id/IdService");
const { ObjectId } = require('mongodb');

exports.getAUser = async (UserModalRepository,phoneNumber) => {
    try{
        //console.log(phoneNumber)
        const user = await UserModalRepository.findOne({phone_number:phoneNumber});
        return user;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

exports.getAUserByUserName = async (UserModalRepository,userName) => {
    try{
        const user = await UserModalRepository.findOne({user_name:userName});
        return user;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

exports.saveAUser = async ({
    userRepositoryStorage,
    phoneNumber,
    countryCode
}) => {
    try{
        const uniqueIdServiceRef = new IdService();
        const user = await userRepositoryStorage.save({phone_number:phoneNumber, country_code:countryCode});
        return user;
    }
    catch(err){
        return err;
    }
}

exports.updateuserDetails = async (UserModalRepository, userId ,walletId, commssionId, profilePicture, firstName, lastName, email, userName, purchableProfile, bio, links, bannerImage, setProfilePrice, price) => {
    try{
         const params = {}
         if(firstName) params.first_name = firstName;
         if(lastName) params.last_name = lastName;
         if(email) params.email = email;
         if(walletId) params.wallet = walletId;
         if(commssionId) params.commission = commssionId;
         if(profilePicture) params.profile_picture = profilePicture;
         if(userName) params.user_name = userName;
         if(purchableProfile) params.is_purchasable_profile = purchableProfile;
         if(bio) params.bio = bio;
         if(links) params.links = links;
         if(setProfilePrice){
            params.set_profile_price = setProfilePrice;
         } 
         else{
            params.set_profile_price = setProfilePrice;
         }
         if(price) params.price =parseFloat(price).toFixed(2);
         params.banner_image = bannerImage;
       //  console.log(params,userId)
         const updateUser = await UserModalRepository.updateOne({_id:userId},params)
        // console.log(updateUser)
         if(updateUser){
            return true;
         }
    }
    catch(err){
        console.log(err)
        return false;
    }
}

exports.searchUsersInList = async (UserModalRepository, searchKey, userId) => {
    try{ //console.log(userId,"userId")
    let usersList;
    if(searchKey != ""){
        const pipeline = [
                            { $match:
                                {
                                   user_name:  searchKey ?  {$regex : `^${searchKey}.*` , $options: 'si' }: {}
                                }
                            },
                            {
                                $lookup:
                                        {
                                            from:"friends",
                                            pipeline:[
                                                {
                                                    $match:{
                                                                friend_requested_user:
                                                                {
                                                                    $in: [new ObjectId(userId)] 
                                                                } 
                                                          }
                                                }
                                            ],
                                            as:"friends"
                                        }
                            }
                        ];

       // console.log(searchKey,pipeline[1].$lookup.pipeline[0].$match, "keys" )
         usersList = await UserModalRepository.aggregate(pipeline);
    }
    else{
        usersList = await UserModalRepository.list();
    }
        return usersList;
    }
    catch(err){
        console.log(err)
    }
}

exports.getAUserByUserId = async (UserModalRepository, profileuserId, userId, isUserId) => {
    try{
      //  console.log(profileuserId,"users")
        const matchparams =  { $match:{  } }
      //  console.log(matchparams)
        if(isUserId){
            matchparams.$match._id = new ObjectId(profileuserId)
        }
        else{
            matchparams.$match.user_name = `${profileuserId}`
        }
        //console.log(matchparams)
        const pipeline = [
            matchparams
           ,
        //    {
        //     $lookup:
        //             {
        //                 from:"friends",
        //                 pipeline:[
        //                     {
        //                         $match: {
        //                           $or: [
        //                              { users: { $eq: [new ObjectId(profileuserId), new ObjectId(userId) ] } },
        //                              { users: { $eq: [new ObjectId(userId), new ObjectId(profileuserId) ] } }
        //                           ]
        //                         }
        //                       }
        //                 ],
        //                 as:"friends"
        //             }
        // }
        ];
        const user = await UserModalRepository.aggregate(pipeline);
        return user;
    }
    catch(err){
        return err;
    }
}