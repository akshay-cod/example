const { MainClass } = require("../../../../config/database/main-class/mainClass");
const paymentsModel = require("./payment.model")
const PaymentsModelRepository = class PaymentsModelRepository extends MainClass{
    constructor() {
     super(paymentsModel);
      this.model = paymentsModel
    }
  };

module.exports =  PaymentsModelRepository;