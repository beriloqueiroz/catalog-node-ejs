if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
var express = require('express');
const fsp = require("fs").promises;
var app = express();

const bcrypt = require('bcrypt')

async function authenticateUser(email, password) {
    const user = users.find(user => user.email === email)
    if (user == null) {
        return { valid: false, message: 'No user with that email' }
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            return { valid: true, user: user }
        } else {
            return { valid: false, message: 'Password incorrect' }
        }
    } catch (e) {
        return e
    }
}
function userExist(email) {
    const user = users.find(user => user.email === email)
    if (user == null) {
        return { valid: true, message: 'user free' }
    }
    return { valid: false, message: 'user already exists' }
}

var products;
async function loadProducts() {
    const jsonFile = await fsp.readFile("server.json");
    products = JSON.parse(jsonFile)
}
app.use(express.static("./public"));

var users;
async function loadUsers() {
    const jsonFile = await fsp.readFile("users.json");
    users = JSON.parse(jsonFile)
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get("/login", (req, res) => {
    if (isNotAuthenticated)
        res.render("pages/login", { message: username, login: username })
})

app.get("/register", (req, res) => {
    if (isNotAuthenticated)
        res.render("pages/register", { message: username, login: username })
})
var username = null;
app.post("/login", async (req, res) => {
    await loadUsers();
    const resp = await authenticateUser(req.body.email, req.body.password);
    if (resp.valid) {
        username = resp.user.name;
        res.render("pages/index", { products: products, login: resp.user.name })
    }
    else
        res.render("pages/login", { message: resp.message, login: username })
})
app.get("/", (req, res) => {
    loadProducts();
    res.render("pages/index", { products: products, login: username })
})

app.get("/logout", async (req, res) => {
    username = null;
    res.render("pages/index", { products: products, login: null })
})

app.post('/register', async (req, res) => {
    try {
        const resp = userExist(req.body.email)
        if (resp.valid) {
            await insertUser(req)
            res.redirect('/login')
        } else {
            res.render("pages/register", { message: resp.message, login: username })
        }
    } catch {
        res.redirect('/register')
    }
})

async function insertUser(req) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
}

app.get("/sobre", (req, res) => {
    res.render("pages/about", { login: username })
})

app.get("/product", (req, res) => {
    loadProducts();
    const product = products.find(prod => prod.id == req.query.productid)
    res.render("pages/product", { product: product, login: username })
})

function isAuthenticated() {
    return !!username
}
function isNotAuthenticated() {
    return !!!username
}

app.listen(8080, loadProducts())
console.log('Runing server');