const Razorpay = require('razorpay');


const PaymentService = class HashService {
   
    async createPaymentOrder(amount){

        const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
          };
       const createdOrder = await instance.orders.create(options);
      // console.log(createdOrder)
       return createdOrder;
    }

    async addCustomer({
        name,
        email,
        contact,
        notes,

    }){
        try{
            const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
            const customerData = {
                name: name,
                email: email,
                contact: contact,
                notes: notes,
              };
            const addedCustomer = await instance.customers.create(customerData);
         //   console.log(addedCustomer,"customer")
            return addedCustomer;
        }
         catch(err){
             console.log(err);
         }
     }

     async createVirtualAccount({
        cust_id,
        type,
        account_number,
        ifsc,
        account_holder_name
     }){
        try{
            const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
            const customerBankAccountData = {
                customer_id: cust_id,
                type: 'bank_account',
                account_number: account_number,
                ifsc: ifsc,
                account_holder_name: account_holder_name,
              };
          const addedDetails = await instance.virtualAccounts.create(customerBankAccountData)
         // console.log(addedDetails,"details")
          return addedDetails
        }
        catch(err){
      console.log(err)
        }
     }
 
   };
 
 module.exports = PaymentService;