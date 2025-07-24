
const UserReviewsModalRepository = require('./model/user-reviews.repository');
exports.getLastestGoodReviews = async (req, res) => {
    try{
        const UserReviewsModalRepositoryStorage = new UserReviewsModalRepository();

       const userLatestGoodReviews = await UserReviewsModalRepositoryStorage.list({
            is_active: true,
            is_deleted: false,
            rating: { $gte: 4 } // Assuming rating is a field in the user reviews
        },
        "",
        0,
        6,
        "user_id"
    )
   // query, sort, start, limit, string
    
       return res.status(200).json({  reviews: userLatestGoodReviews });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.saveAReview = async (req, res) => {
    try{
        const UserReviewsModalRepositoryStorage = new UserReviewsModalRepository();

       const savedUserReview = await UserReviewsModalRepositoryStorage.save({
            item_id: req.body.item_id,
            user_id: req.user.userId,
            comment: req.body.comment,
            images: req.body.images || [],
            rating: req.body.rating
        }
    )
    
       return res.status(200).json({  reviews: savedUserReview });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}