const router = require('express').Router()

const customerCtrl = require('../controllers/customer')

const authMdlw = require('../middleware/auth')
const roleBasedAccessMdlw = require('../middleware/roleBasedAccess')
const imageUploderMdlw = require('../middleware/imageUploader')

let uploadFields = [{ name: 'profileimage' }]

let profileUpload = imageUploderMdlw.uploadimage.fields(uploadFields)

router.delete(
    '/profile',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isCustomer,
    customerCtrl.deleteProfile
)

router.put(
    '/profile',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isCustomer,
    profileUpload,
    customerCtrl.updateProfile
)

router.get('/:id', customerCtrl.getCustomer)
router.post('/:id', customerCtrl.updateCustomer)

module.exports = router
