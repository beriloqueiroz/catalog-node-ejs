const fsp = require('fs').promises;
const fileName = 'users.json';
async function getUsers() {
    const fileStr = await fsp.readFile(fileName);
    return JSON.parse(fileStr);
}
async function setUsers(users) {
    await fsp.writeFile(fileName, JSON.stringify(users, null, 2))
}
module.exports = {
    async get() {
        const ret = await getUsers();
        return ret;
    },
    async create(user) {
        let users = await getUsers();
        users.push(user)
        await setUsers(users)
    },
    async delete(id) {
        let users = getUsers();
        users = users.filter(user => user.id != id)
        await setUsers(users)
    }
}