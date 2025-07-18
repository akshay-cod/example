const crypto = require("crypto");

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.SECRET_KEY || '12345678901234567890123456789012'; // 32 bytes


const HashService = class HashService {
   
    async genrateOTP(){
        const otp = crypto.randomInt(10000,99999);
        return otp;
    }

    async hashData(data){
        try{
            const hashedData = crypto.createHmac('sha256',process.env.HASH_SECREAT).update(data).digest('hex');
            return hashedData
         }
         catch(err){
             console.log(err);
         }
     }
 
     async deHashData(data){
        try{
            const dehashedData = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(data.toString())
            .digest('hex');
            return dehashedData;
        }
        catch(err){

        }
     }

     encryptJson(json) {
        const iv = crypto.randomBytes(16); // 16 bytes
        const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        let encrypted = cipher.update(JSON.stringify(json), 'utf8', 'base64');
        encrypted += cipher.final('base64');
      
        return {
          iv: iv.toString('base64'),
          encryptedData: encrypted
        };
      }

    decryptJson(encryptedData, ivBase64) {
        const iv = Buffer.from(ivBase64, 'base64');
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
      }

   };

  
 
 module.exports = HashService;