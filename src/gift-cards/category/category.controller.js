
const CategoryModalRepository = require('./model/category.model.repository');
exports.saveACategory = async (req, res) => {
    try{
        const { categoryName, categoryDescription, slug, parent_id } = req.body;
        if (!categoryName || !categoryDescription) {
            return res.status(400).json({ error: 'Category name and description are required' });
        }
        const categoryRepositoryStorage = new CategoryModalRepository();

       const newCategory = await categoryRepositoryStorage.save({
            name: categoryName,
            // description: categoryDescription,
            parent_id,
            slug,
            created_by: req.user.userId,
        })
    
       return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getCategoryList = async (req, res) =>{
    try{
    
        const categoryRepositoryStorage = new CategoryModalRepository();

       const catogeries = await categoryRepositoryStorage.aggregate([
        {
          $match: { parent_id: null,
            is_active: true,
            is_deleted: false
           } // Root categories
        },
        {
          $graphLookup: {
            from: 'categories',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent_id',
            as: 'sub_categories',
            depthField: 'depth',
            restrictSearchWithMatch: {
                is_active: true,
                is_deleted: false
              }
          }
        }
      ])


    
       return res.status(200).json({  category: catogeries });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}