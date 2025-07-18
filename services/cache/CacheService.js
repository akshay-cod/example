const { createClient } = require("redis");

const CacheService = class CacheService {
   
    async setKeyValue(key, value){
        try{
        const client = createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        
        await client.connect();
        const res = await client.set(key,JSON.stringify(value))
       // await client.disconnect()
        return true
        }
        catch(err){
            console.log(err)
        }
    }

    async getKeyValue( key ){
        const client = createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
        const res = await client.get(key)
      //  await client.disconnect()
      //  console.log(res)
        return JSON.parse(res)
    }

};

module.exports = CacheService;