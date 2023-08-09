const router = require('express').Router()

const reservationCtrl = require('../controllers/reservation')

router.post('/reservationdetail', reservationCtrl.makeReservation)

router.get('/reservationdetail/:restaurantId', reservationCtrl.getReservation)

router.get(
    '/reservationhistory/:customerId',
    reservationCtrl.getCustomerReservation
)

router.put(
    '/reservationcancel/:reservationId/cancel',
    reservationCtrl.cancelReservation
)

router.get('/:id', reservationCtrl.getAllRestaurantReservations)

module.exports = router
