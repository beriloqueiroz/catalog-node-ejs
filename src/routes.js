const express = require('express');
const routes = express.Router();
const LoginController = require('./controllers/LoginController')
const RegisterController = require('./controllers/RegisterController')
const ProductController = require('./controllers/ProductController')
const Product = require('./model/Product')
const HomeController = require('./controllers/HomeController')


function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}


routes.get("/login", LoginController.init)
routes.get("/register", RegisterController.init)
routes.post("/login", LoginController.authenticate)
routes.get("/", HomeController.index)
routes.post('/register', RegisterController.insert)
routes.get("/product", ProductController.init)
routes.get("/insertProduct", restrict, ProductController.insert)
routes.get("/logout", async (req, res) => {
    const products = await Product.get();
    req.session.destroy(function () {
        res.render("pages/index", { products: products, username: null });
    });
})

routes.get("/sobre", restrict, async (req, res) => {
    res.render("pages/about", { username: req.session.user.name })
})

module.exports = routes;