const router = require('express').Router()

const waiterCtrl = require('../controllers/waiter')
const authMdlw = require('../middleware/auth')
const roleBasedAccessMdlw = require('../middleware/roleBasedAccess')

router.get(
    '/viewreservation',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isWaiter,
    waiterCtrl.viewReservation
)

module.exports = router