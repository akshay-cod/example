const WalletModelRepository = require("../../wallet/model/wallet.model.repository");
const { increaseATypeOfCreations } = require("../../wallet/wallet.use.cases");

const typesOfCreations = {
    video:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    },
    image:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    },
    audio:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    },
    document:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    },
    any:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    },
    file:{
        useCase: async function (userId, type){
            try{
                const WalletModelRepositoryStorage = new WalletModelRepository();
                const res = await increaseATypeOfCreations(WalletModelRepositoryStorage,userId, type)
                return true
            }
           catch(err){
            console.log(err)
           }
        }
    }
}

exports.handleTypeOfCreationsUpdate = async (userId, type) => {
    try{
       const updated = await typesOfCreations[type].useCase(userId, type)
       return true
    }
    catch(err){

    }
}