const Product = require('../model/Product')
const LoginController = require('../controllers/LoginController');
module.exports = {
    async index(req, res) {
        const products = await Product.get();
        const username = LoginController.getUsername()
        res.render("pages/index", { products: products, username: username })
    }
}