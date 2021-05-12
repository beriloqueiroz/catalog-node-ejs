const LoginController = require('../controllers/LoginController');
const Product = require('../model/Product')
module.exports = {
    async init(req, res) {
        const username = LoginController.getUsername();
        const products = await Product.get();
        const product = products.find(prod => prod.id == req.query.productid)
        return res.render("pages/product", { product: product, username: username })
    }
}