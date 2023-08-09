const router = require('express').Router()
const authCtrl = require('../controllers/auth')

const validationMdlw = require('../middleware/validation')
const authMdlw = require('../middleware/auth')

router.post('/login', validationMdlw.validateLogin, authCtrl.login)

router.post('/register', validationMdlw.validateRegister, authCtrl.register)

router.put('/changePassword/:id', authCtrl.changePassword)

router.post('/validateToken', authMdlw.decodeJWTToken, function (req, res){ res.status(200).json({ msg: "Token is Valid", isValid : true }) })

module.exports = router
