const { MainClass } = require("../../../../config/database/main-class/mainClass");
const bankDetailsModel = require("./bankdetails.model")
const BankDetailsModelRepository = class BankDetailsModelRepository extends MainClass{
    constructor() {
     super(bankDetailsModel);
      this.model = bankDetailsModel
    }
  };

module.exports = BankDetailsModelRepository;