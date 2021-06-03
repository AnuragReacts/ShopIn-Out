const route = require('express').Router();
const userController = require('../controllers/user-controller');

// Cart Routes
route.get('/', async (req, res) => {           //My Cart of user
    const cartProducts = await userController.getCart(req.user.email);
    return res.json(cartProducts);
});

route.post('/:id', async (req, res) => {       //Add Cart
    const data = await userController.addToCart(req.user.email, req.params.id);
    return res.json(data);
});

route.delete('/:id', async (req, res) => {    //Remove Cart
    const data = await userController.removeFromCart(req.user.email, req.params.id);
    return res.json(data);
});

module.exports = { route };
