const router = require('express').Router()

const adminCtrl = require('../controllers/admin')

const authMdlw = require('../middleware/auth')
const roleBasedAccessMdlw = require('../middleware/roleBasedAccess')

router.get(
    '/restaurant/:approvalstatus',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isAdmin,
    adminCtrl.getRestaurantByStatus
)
router.put(
    '/restaurant/:id',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isAdmin,
    adminCtrl.updateRestaurantStatus
)

router.get('/:id', adminCtrl.getAdmin)
router.post('/:id', adminCtrl.updateAdmin)

module.exports = router
