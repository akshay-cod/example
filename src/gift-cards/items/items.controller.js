
const ItemsModalRepository = require('./model/items.model.repository');
const mongoose = require('mongoose');
exports.saveAnItem = async (req, res) => {
    try{
        const { itemName, itemDescription, slug, category_id, 
          logo, short_description, denominations, currency, validityPeriod,
          features, discount, images
        } = req.body;
        if (!itemName || !itemDescription) {
            return res.status(400).json({ error: 'items name and description are required' });
        }
        // const images=[{
        //     type: 'main',
        //     url: "http://example.com/image.jpg",
        // }
        // ]
        const itemRepositoryStorage = new ItemsModalRepository();

       const items = await itemRepositoryStorage.save({
            name: itemName,
            description: itemDescription,
            category_id,
            slug,
            images,
            created_by: req.user.userId,
            logo, short_description, denominations, currency, validityPeriod,
            features, discount
        })
    
       return res.status(201).json({ message: 'items created successfully', items: items });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getItemsList = async (req, res) =>{
    try{
    
        const itemsRepositoryStorage = new ItemsModalRepository();

        const items = await itemsRepositoryStorage.aggregate([
            {
              $match: {
                is_active: true,
                is_deleted: false
              }
            },
            // {$project: {
            //     name: 1,
            //     slug: 1,
            //     price: 1,
            //     images: 1
            // }
            // }
            // {
            //   $lookup: {
            //     from: 'categories',
            //     localField: 'category_id',
            //     foreignField: '_id',
            //     as: 'category'
            //   }
            // },
            // {
            //   $unwind: {
            //     path: '$category',
            //     preserveNullAndEmptyArrays: false
            //   }
            // },
            // {
            //   $match: {
            //     'category.is_active': true,
            //     'category.is_deleted': false
            //   }
            // },
            // {
            //   $graphLookup: {
            //     from: 'categories',
            //     startWith: '$category.parent_id',
            //     connectFromField: 'parent_id',
            //     connectToField: '_id',
            //     as: 'category_ancestors',
            //     depthField: 'depth',
            //     restrictSearchWithMatch: {
            //       is_active: true,
            //       is_deleted: false
            //     }
            //   }
            // }
          ]);
          


    
       return res.status(200).json({  items });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getAnItem = async (req, res) =>{
    try{
    console.log(req.params.itemId)
        const itemsRepositoryStorage = new ItemsModalRepository();

        const item = await itemsRepositoryStorage.aggregate([
            {
              $match: {
                is_active: true,
                is_deleted: false,
                _id: new mongoose.Types.ObjectId(req.params.itemId)
              }
            },
            
            {
              $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category'
              }
            },
            {
              $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: false
              }
            },
            {
              $match: {
                'category.is_active': true,
                'category.is_deleted': false
              }
            },
            {
              $graphLookup: {
                from: 'categories',
                startWith: '$category.parent_id',
                connectFromField: 'parent_id',
                connectToField: '_id',
                as: 'category_ancestors',
                depthField: 'depth',
                restrictSearchWithMatch: {
                  is_active: true,
                  is_deleted: false
                }
              },
            },
            {
                $lookup: {
                  from: 'user_reviews',
                  let: { itemId: '$_id' },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ['$item_id', '$$itemId'] },
                            { $eq: ['$is_active', true] },
                            { $eq: ['$is_deleted', false] }
                          ]
                        }
                      }
                    }
                  ],
                  as: 'reviews'
                }
            }
          ]);
          
    
       return res.status(200).json({  item });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTrendingItemsList = async (req, res) =>{
  try{
    
    const itemsRepositoryStorage = new ItemsModalRepository();

    const items = await itemsRepositoryStorage.list({},"", 0, 6);

   return res.status(200).json({  items });
}
catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
}
}