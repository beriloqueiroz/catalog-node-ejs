const fsp = require('fs').promises;
const fileName = "products.json";
async function getProducs() {
    const fileStr = await fsp.readFile(fileName);
    return JSON.parse(fileStr);
}
async function setProducts(products) {
    await fsp.writeFile(fileName, JSON.stringify(products, null, 2))
}
module.exports = {
    async get() {
        const ret = await getProducs();
        return ret;
    },
    async create(product) {
        let products = getProducs();
        products.push(product)
        await setProducts(products)
    },
    async delete(id) {
        let products = getProducs();
        products = products.filter(prod => prod.id != id)
        await setProducts(products)
    }
}