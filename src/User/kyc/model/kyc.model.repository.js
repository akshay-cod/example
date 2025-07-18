const { MainClass } = require("../../../../config/database/main-class/mainClass");
const kycModel = require("./kyc.model")
const KycModelRepository = class KycModelRepository extends MainClass{
    constructor() {
     super(kycModel);
      this.model = kycModel
    }
  };

module.exports =  KycModelRepository;