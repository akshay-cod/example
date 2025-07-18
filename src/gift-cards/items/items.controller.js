
const ItemsModalRepository = require('./model/items.model.repository');
exports.saveAnItem = async (req, res) => {
    try{
        const { itemName, itemDescription, slug, price, category_id } = req.body;
        if (!itemName || !itemDescription) {
            return res.status(400).json({ error: 'items name and description are required' });
        }
        const images=[{
            type: 'main',
            url: "http://example.com/image.jpg",
        }
        ]
        const itemRepositoryStorage = new ItemsModalRepository();

       const items = await itemRepositoryStorage.save({
            name: itemName,
            description: itemDescription,
            category_id,
            price,
            slug,
            images,
            created_by: req.user.userId,
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
              }
            }
          ]);
          


    
       return res.status(200).json({  items });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}