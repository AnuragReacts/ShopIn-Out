const route = require("express").Router();
const productController = require("../controllers/product-controller");
const userController = require("../controllers/user-controller");
const { isProductInUserProducts } = require("./helper-functions");   //To verify user who attempts to modify a product

// Cart Route (Backend)
route.use('/cart', require('./cart-route').route);

//GET Requests
route.get('/', (req, res) => {
    productController.getAll().then((data) => res.json(data));     //Sends All data in Products DB
});

route.get('/myproducts', (req, res) => {          //(The JSON DATA )               //Sends All added products by the respective User
    userController.getUserByEmail(req.user.email).then((user) => {
        if(!user) {
            return res.json({ 'error' : 'User does not exist.'});
        } else {
            return res.json(user.products);    //Returns all user added products if found
        }
    });
});

route.get('/:id', (req, res) => {             //For editing
    productController.getById(req.params.id).then((product) => res.json(product));
});


//POST Requests
route.post('/', (req, res) => {                                   //Adding a Product
    productController.add(req.user.email, req.body).then((product) => {       //First adds in Products DB
        userController.addProduct(req.user.email, product).then(() => {      //Then in respective User DB
            res.redirect('/user');     //User HOME Page
        });
    });
});

route.post('/:id', async (req, res) => {      //For editing the Product (of given id)
    if(isProductInUserProducts(req.user.email, req.params.id)) {    // function exported from Helper
        req.body.email = req.user.email;      //Reassign the value in Products DB
        const product = await productController.update(req.params.id, req.body);    //First Update in Products DB
        await userController.updateProduct(req.user.email, req.params.id, product).then((product) => {  //Then Update in Users DB
            return res.redirect('/products/' + req.params.id);
        });
    }
});

// DELETE Requests
route.delete('/:id', (req, res) => {
    if(isProductInUserProducts(req.user.email, req.params.id)) {    //Authenticates User bfr deleting the product
        userController.removeProduct(req.user.email, req.params.id);    //Deleting from Users DB
        productController.remove(req.params.id);                        //Deleting from Products DB
    }
    return res.send();
});

module.exports = { route };
