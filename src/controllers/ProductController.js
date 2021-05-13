const Product = require('../model/Product');
module.exports = {
    async init(req, res) {
        const username = req.session.user?.name;
        const products = await Product.get();
        const product = products.find(prod => prod.id == req.query.productid)
        return res.render("pages/product", { product: product, username: username })
    },
    async insert(req, res) {
        const username = req.session.user?.name;
        return res.render("pages/insertProduct", { username: username });
    }
}