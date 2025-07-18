const { MainClass } = require("../../../../config/database/main-class/mainClass");
const creationsModel = require("./creations.model")
const CreationsModelRepository = class CreationsModelRepository extends MainClass{
    constructor() {
     super(creationsModel);
      this.model = creationsModel
    }
  };

module.exports =  CreationsModelRepository;