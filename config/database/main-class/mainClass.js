module.exports.MainClass = class MainClass {
    constructor(model) {
      this.model = model
    }

    save(query) {
        let newSave = new this.model(query)
        return newSave.save();
    }
  
    list(query, sort, start, limit, string) {
      return this.model.find({...query, is_deleted:false, is_active:true})
      .sort(sort || {createdAt: -1})
      .skip(parseInt(start || 0))
      .limit(parseInt(limit == "noLimit" ? {} : limit  || 10)).populate(string || "");
    }

    findOne(query, populate) {
        return this.model.findOne({...query, is_deleted:false, is_active:true}).populate(populate || "");
    }

    updateOne(query,data) {
      return this.model.updateOne(query,data)
    }

    deleteOne(query) {
      return this.model.updateOne(query,{is_deleted:true, is_active:false})
    }

    aggregate(pipeline) {
      return this.model.aggregate(pipeline)
    }

  };