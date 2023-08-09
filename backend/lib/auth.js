const jwt = require('jsonwebtoken')

const {secret_key} = require('../config/vars') 

module.exports.generateJWTToken = function (data) {

    const payload = {
        id: data.id,
        user: data.user,
        firstname: data.firstname,
        email: data.email,
        iat: Date.now()
    }

    
    const options = {
        algorithm: "HS512",
        expiresIn:86400*30 // 1day = 60second * 60 * 24
    }

    const token = jwt.sign(payload,secret_key,options)
    return token
}