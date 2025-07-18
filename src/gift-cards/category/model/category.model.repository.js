const { MainClass } = require("../../../../config/database/main-class/mainClass");
const catagoryModal = require("./category.model")
const CatagoryModalRepository = class CatagoryModalRepository extends MainClass{
    constructor() {
     super(catagoryModal);
      this.model = catagoryModal
    }
  };

module.exports =  CatagoryModalRepository;