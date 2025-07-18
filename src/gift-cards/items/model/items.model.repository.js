const { MainClass } = require("../../../../config/database/main-class/mainClass");
const itemsModel = require("./items.model")
const ItemsModelRepository = class ItemsModelRepository extends MainClass{
    constructor() {
     super(itemsModel);
      this.model = itemsModel
    }
  };

module.exports =  ItemsModelRepository;