const Product = require('../model/Product')
module.exports = {
    async index(req, res) {
        const products = await Product.get();
        const username = req.session.user?.name;
        res.render("pages/index", { products: products, username: username })
    }
}