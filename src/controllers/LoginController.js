const User = require('../model/User')
const Product = require('../model/Product')
const bcrypt = require('bcrypt')
let username = null;
module.exports = {
    async authenticate(req, res) {
        const users = await User.get();
        const products = await Product.get();
        const user = users.find(user => user.email === req.body.email)
        if (user == null) {
            return res.render("pages/login", { message: 'No user with that email', username: username })
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            username = user.name;
            return res.render("pages/index", { products: products, username: username })
        } else {
            return res.render("pages/login", { message: 'Password incorrect', username: username })
        }
    },
    isAuthenticated() {
        return !!username
    },
    isNotAuthenticated() {
        return !!!username
    },
    init(req, res) {
        if (!!!username) {
            return res.render("pages/login", { message: username, username: username })
        } else {
            return res.redirect("/")
        }
    },
    getUsername() {
        return username;
    },
    setUsername(name) {
        username = name;
    }
}