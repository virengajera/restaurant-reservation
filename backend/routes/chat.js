const router = require('express').Router()

const chatCtrl = require('../controllers/chat')

const authMdlw = require('../middleware/auth')
const roleBasedAccessMdlw = require('../middleware/roleBasedAccess')

router.post('/room', authMdlw.decodeJWTToken, chatCtrl.createRoom)

router.get('/room/:user/:id', chatCtrl.getRoomID)

router.get('/message/:roomID', chatCtrl.getMessage)

router.get('/getallmessages', authMdlw.decodeJWTToken, chatCtrl.getAllMessages)

router.get('/restaurantowners/:id/rooms', chatCtrl.getRestaurantOwnerRooms)

router.put('/isread', chatCtrl.updateIsReadStatus)

module.exports = router
