const mongoose = require("mongoose");
const Product = mongoose.model(require("../models/product-model").MODEL_NAME);  //SchemaModel defined in product-model

exports.add = function(email, product) {        //Adding product into Products DB
    product.email = email;
    const newProduct = new Product(product);
    return newProduct.save();
}

exports.getAll = function() {
    return Product.find({}).exec();
}

exports.getById = function(id) {
    return Product.findById(id).exec();
}

exports.update = function(id, product) {       //EDIT product
    return Product.findByIdAndUpdate(id, product, { useFindAndModify: true, new: true }).exec();  //new: true -> returns updated product
}

exports.remove = function(id) {                //DELETE product
    return Product.findByIdAndDelete(id, { useFindAndModify: true }).exec();
}
