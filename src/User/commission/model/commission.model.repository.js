const { MainClass } = require("../../../../config/database/main-class/mainClass");
const commissionModel = require("./commission.model")
const CommissionModelRepository = class CommissionModelRepository extends MainClass{
    constructor() {
     super(commissionModel);
      this.model = commissionModel
    }
  };

module.exports =  CommissionModelRepository;