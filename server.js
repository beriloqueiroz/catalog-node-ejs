const express = require('express');
const fsp = require("fs").promises;
const app = express();



var itens;
async function loadFile() {
    const jsonFile = await fsp.readFile("server.json");
    itens = JSON.parse(jsonFile)
}

app.set('view engine', 'ejs');

app.use(express.static("./public"));


app.get("/", (req, res) => {
    loadFile();
    res.render("pages/index", { products: itens })
})

app.get("/sobre", (req, res) => {
    loadFile();
    res.render("pages/about")
})

app.get("/product", (req, res) => {
    loadFile();
    const product = itens.find(prod => prod.id == req.query.productid)
    res.render("pages/product", { product: product })
})

app.listen(8080, loadFile())

console.log('Runing server');