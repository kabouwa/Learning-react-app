const 
config = require('../config/config'),
usersApi = require('../services/users'),
jwt = require('jsonwebtoken');

const login = async (req,res) => {
    try{
        const { username, password } = req.body;
    
        const userData = await usersApi.login(username,password);
    
        if(!userData) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.'
            })
        }

        const token = jwt.sign(
            { userId: userData.id},
            config('JWT_SECRET'),
            { expiresIn: '1h'}
        )

        delete userData.password

        res.json({
            success: true,
            user : userData,
            token : token
        });
    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Unable to process login.'
        });
    }
}

module.exports = login;