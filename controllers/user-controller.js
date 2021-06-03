const mongoose = require("mongoose");
const User = mongoose.model(require("../models/user-model").MODEL_NAME);  //User SchemaModel from models
const productController = require('./product-controller');
const Product = mongoose.model(require('../models/product-model').MODEL_NAME);   //Product SchemaModel from models

exports.addUser = function(obj) {
    const newuser = new User(obj);
    return newuser.save();
}

exports.addProduct = async function(email, product) {            //Adding product into Users DB
    let user = await User.findOne({ email: email }).exec();
    user.products.push(product);            //As product is an array type in user SchemaModel
    return user.save();
}

exports.getUserByEmail = function(email) {
    return User.findOne({email}).exec();
}

exports.updateProduct = async function(email, productId, product) {      //EDIT product in Users DB
    const user = await User.findOne({email}).exec();
    for(let i = 0; i < user.products.length; i++) {
        if(user.products[i]._id == productId) {
            user.products[i] = product;
            return user.save();
        }
    }
}

exports.removeProduct = async function(email, productId) {              //DELETE product from Users DB
    const user = await User.findOne({email}).exec();
    for(let i = 0; i < user.products.length; i++) {
        if(user.products[i]._id == productId) {
            user.products.splice(i, 1);        //delets 1 element starting from i
            return user.save();
        }
    }
}


// Cart Functionality
exports.addToCart = async function(email, productId) {
    const user = await User.findOne({ email }).exec();
    user.cart.push(productId);
    return user.save();
}

exports.getCart = async function(email) {
    const user = await User.findOne({ email }).exec();     //Find current user
    let cartProducts = [];
    for(let i = 0; i < user.cart.length; i++) {            //In users bd cart
        const product = await Product.findById(user.cart[i]);    //get products from Products db
        if(product)
            cartProducts.push(product);
    }
    return cartProducts;
}

exports.removeFromCart = async function(email, productId) {
    const user = await User.findOne({ email }).exec();
    for(let i = 0; i < user.cart.length; i++) {                 //Find in Users db -> array of cart
        if(user.cart[i] == productId) {
            user.cart.splice(i, 1);                  //Delete
            break;
        }
    }
    return user.save();
}
