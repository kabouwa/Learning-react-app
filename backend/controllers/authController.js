const usersApi = require('../services/users');

const login = async (req,res) => {
    const { username, password } = req.body;

    const userData = await usersApi.login(username,password);

    if(userData) {
        delete userData.password
    }

    res.json({
        success: userData ? true : false,
        user : userData
    });
}

module.exports = login;