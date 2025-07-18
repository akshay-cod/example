const { MainClass } = require("../../../../config/database/main-class/mainClass");
const walletModel = require("./wallet.model")
const WalletModelRepository = class WalletModelRepository extends MainClass{
    constructor() {
     super(walletModel);
      this.model = walletModel
    }
  };

module.exports =  WalletModelRepository;