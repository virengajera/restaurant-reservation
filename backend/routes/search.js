const router = require('express').Router();

const restaurantCtrl = require('../controllers/restaurant')


router.get("/searchrestaurant",restaurantCtrl.searchAllRestaurant)

router.get("/restaurantdetail/:id",restaurantCtrl.searchRestaurantById)


module.exports = router