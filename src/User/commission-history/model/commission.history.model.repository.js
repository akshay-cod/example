const { MainClass } = require("../../../../config/database/main-class/mainClass");
const commissionHistoryModel = require("./commission.history.model")
const CommissionHistoryModelRepository = class CommissionHistoryModelRepository extends MainClass{
    constructor() {
     super(commissionHistoryModel);
      this.model = commissionHistoryModel
    }
  };

module.exports =  CommissionHistoryModelRepository;