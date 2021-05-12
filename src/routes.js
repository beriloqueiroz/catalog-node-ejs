const express = require('express');
const routes = express.Router();
const LoginController = require('./controllers/LoginController')
const RegisterController = require('./controllers/RegisterController')
const ProductController = require('./controllers/ProductController')
const Product = require('./model/Product')
const HomeController = require('./controllers/HomeController')

routes.get("/login", LoginController.init)
routes.get("/register", RegisterController.init)
routes.post("/login", LoginController.authenticate)
routes.get("/", HomeController.index)
routes.post('/register', RegisterController.insert)
routes.get("/product", ProductController.init)

routes.get("/logout", async (req, res) => {
    LoginController.setUsername(null);
    const products = await Product.get();
    res.render("pages/index", { products: products, username: null })
})

routes.get("/sobre", async (req, res) => {
    const username = await LoginController.getUsername()
    res.render("pages/about", { username: username })
})

module.exports = routes;