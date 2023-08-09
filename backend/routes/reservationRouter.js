const router = require("express").Router();

const reservationCtrl = require("../controllers/reservation");

const authMdlw = require("../middleware/auth");
const roleBasedAccessMdlw = require("../middleware/roleBasedAccess");

router.get(
  "/:id",
  authMdlw.decodeJWTToken,
  roleBasedAccessMdlw.isRestaurantOwner,
  reservationCtrl.getAllRestaurantReservations
);

module.exports = router;
