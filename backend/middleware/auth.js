const jwt = require('jsonwebtoken')

const {secret_key} = require('../config/vars') 

module.exports.decodeJWTToken = function(req, res, next){

    var token = req.headers["x-access-token"] || (req.body && req.body.access_token);
    if (token) {
        try {
            //if token passed is invalid jwt.decode will throw error which is caught in its "catch" handler
            const decodedtoken = jwt.verify(token,secret_key,{algorithm:"HS512"})

            res.locals.id = decodedtoken.id
            res.locals.user = decodedtoken.user
            res.locals.email = decodedtoken.email
            res.locals.firstname = decodedtoken.firstname
            next()

        } catch (err) {
            console.log("jwt.decode failed" + err);
            return res.status(401).json({status: "Failure", "msg": "Invalid token"});
        }
    } else {
        console.log("token is empty");
        return res.status(401).json({status: "Failure", "msg": "Invalid token"});
    }
};