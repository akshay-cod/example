const { MainClass } = require("../../../../config/database/main-class/mainClass");
const userModal = require("./auth.model")
const UserModalRepository = class UserModalRepository extends MainClass{
    constructor() {
     super(userModal);
      this.model = userModal
    }
  };

module.exports =  UserModalRepository;