const { MainClass } = require("../../../../config/database/main-class/mainClass");
const userReviewsModel = require("./user-reviews.model")
const UserReviewsModelRepository = class UserReviewsModelRepository extends MainClass{
    constructor() {
     super(userReviewsModel);
      this.model = userReviewsModel
    }
  };

module.exports =  UserReviewsModelRepository;