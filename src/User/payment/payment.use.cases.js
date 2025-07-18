
exports.saveAnOrder = async (PaymentsModelRepository, productId, orderId, price, user, owner ) => {
    try{
        const order = {
            product:productId,
            order_id:orderId,
            price:price,
            transaction_history:[],
            status:"initiated",
            created_by:user,
            owner:owner
        }
        const savedOrder = await PaymentsModelRepository.save(order);
        return savedOrder;
    }
    catch(err){
        return err;
    }
}

exports.updateAnOrder = async (PaymentsModelRepository, orderId, transaction, paymentStatus) => {
    try{
        const query = 
            {
                "$push": { transaction_history: transaction },
                 status:paymentStatus
             }
        const updatedOrder = await PaymentsModelRepository.updateOne({order_id:orderId}, query)
        return updatedOrder;
    }
    catch(err){

    }
}

exports.getAnOrder = async (PaymentsModelRepository, orderId) => {
    try{
        const searchedOrder = await PaymentsModelRepository.findOne({order_id:orderId})
        return searchedOrder;
    }
    catch(err){

    }
}