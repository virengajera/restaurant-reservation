const router = require('express').Router()

const restaurantOwnerCtrl = require('../controllers/restaurantOwner')

const authMdlw = require('../middleware/auth')
const roleBasedAccessMdlw = require('../middleware/roleBasedAccess')
const imageUploderMdlw = require('../middleware/imageUploader')

let uploadFields = [{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]

let profileUploadField = [{ name: 'profileimage' }]

let multipleUploads = imageUploderMdlw.uploadimage.fields(uploadFields)

let profileUpload = imageUploderMdlw.uploadimage.fields(profileUploadField)

router.post(
    '/addwaiter',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.addWaiter
)

router.delete(
    '/removewaiter',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.removeWaiter
)

router.get(
    '/viewwaiter',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.viewWaiter
)

router.put(
    '/updatewaiter',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    // multipleUploads,
    restaurantOwnerCtrl.updateWaiter
)

router.get(
    '/viewrestaurant',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.viewRestaurant
)

router.post(
    '/addrestaurant',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    multipleUploads,
    restaurantOwnerCtrl.addRestaurant
)

router.put(
    '/updaterestaurant',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    multipleUploads,
    restaurantOwnerCtrl.updateRestaurant
)

router.delete(
    '/removerestaurant',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.removeRestaurant
)

router.delete(
    '/profile',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    restaurantOwnerCtrl.deleteProfile
)

router.put(
    '/profile',
    authMdlw.decodeJWTToken,
    roleBasedAccessMdlw.isRestaurantOwner,
    profileUpload,
    restaurantOwnerCtrl.updateProfile
)

router.get('/:id', restaurantOwnerCtrl.getRestaurantOwner)
router.post('/:id', restaurantOwnerCtrl.updateRestaurantOwner)

router.get('/:id/restaurants', restaurantOwnerCtrl.getRestaurantsByOwnerId)
module.exports = router
