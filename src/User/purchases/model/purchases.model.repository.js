const { MainClass } = require("../../../../config/database/main-class/mainClass");
const purchasesModel = require("./purchases.model")
const PurchasesModelRepository = class PurchasesModelRepository extends MainClass{
    constructor() {
     super(purchasesModel);
      this.model = purchasesModel
    }
  };

module.exports =  PurchasesModelRepository;