const User = require('../model/User')
const bcrypt = require('bcrypt')
async function userExist(email) {
    const users = await User.get();
    const user = users.find(user => user.email == email)
    if (user == null) {
        return { valid: true, message: 'user free' }
    }
    return { valid: false, message: 'user already exists' }
}
async function insertUser(req) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    await User.create(newUser);
}
module.exports = {
    async insert(req, res) {
        const resp = await userExist(req.body.email)
        if (resp.valid) {
            await insertUser(req)
            return res.redirect('/login')
        } else {
            return res.render("pages/register", { message: resp.message, username: req.session.user?.name })
        }
    },
    init(req, res) {
        if (!req.session.user)
            return res.render("pages/register", { message: req.session.user?.name, username: req.session.user?.name })
        else return res.redirect("pages/index")
    }
}