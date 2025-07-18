const { MainClass } = require("../../../../config/database/main-class/mainClass");
const friendsModel = require("./friends.model")
const FriendsModelRepository = class FriendsModelRepository extends MainClass{
    constructor() {
     super(friendsModel);
      this.model = friendsModel
    }
  };

module.exports =  FriendsModelRepository;