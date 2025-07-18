const nanoId = require("nanoid");

const IdService = class IdService {

    genrateRandomUniqueId(){
        const rdNumber =Math.floor(Math.random() * (20 - 10) + 10)
       // console.log(rdNumber)
        const uid = nanoId.nanoid(rdNumber)
       // console.log(uid)
        return uid 
    }

}

module.exports = IdService;
