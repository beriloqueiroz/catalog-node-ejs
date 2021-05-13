const User = require('../model/User')
const Product = require('../model/Product')
const bcrypt = require('bcrypt')

module.exports = {
    async authenticate(req, res) {
        const users = await User.get();
        const products = await Product.get();
        const user = users.find(user => user.email === req.body.email)
        if (user == null) {
            return res.render("pages/login", { message: 'No user with that email', username: username })
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const username = user?.name;
            req.session.regenerate(function () {
                req.session.user = user;
                console.log(req.session.user);
                return res.render("pages/index", { products: products, username: username })
            });
        } else {
            return res.render("pages/login", { message: 'Password incorrect', username: null })
        }
    },
    init(req, res) {
        return res.render("pages/login", { message: req.session.user?.name, username: req.session.user?.name })
    }
}