const { MainClass } = require("../../../../config/database/main-class/mainClass");
const withdrawelModel = require("./withdrawel.model")
const WithdrawelModelRepository = class WithdrawelModelRepository extends MainClass{
    constructor() {
     super(withdrawelModel);
      this.model = withdrawelModel
    }
  };

module.exports =  WithdrawelModelRepository;