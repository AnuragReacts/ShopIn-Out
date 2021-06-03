const path = require("path");
const route = require("express").Router();

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/html/home.html"));             //HOME Page
});

route.get('/logout', (req, res) => {         //Logout function
    req.logOut();
    return res.redirect('/login');
})

route.get('/add_product', (req, res) => {          //User to add a product
    return res.sendFile(path.join(__dirname, "../views/html/add_product.html"));      //ADD_PRODUCT Page
})

route.get('/myproducts', (req, res) => {          //All products added by user (The HTML file)
    return res.sendFile(path.join(__dirname, "../views/html/my_products.html"));      //MY PRODUCTS Page
});

route.get('/editproduct/:id', (req, res) => {     //To edit a product
    return res.sendFile(path.join(__dirname, "../views/html/edit_product.html"));     //EDIT PRODUCT Page
});

// Cart Frontend
route.get('/cart', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/html/cart.html'));
});
module.exports = { route };
