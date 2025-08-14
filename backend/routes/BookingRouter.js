const { createBooking, getBookings } = require('../controllers/BookingController');
const ensureAuthenticated = require('../middlewares/Auth');
const { bookingValidation } = require('../middlewares/Validation');

const router = require('express').Router();

router.post('/', ensureAuthenticated, bookingValidation, createBooking);
router.get('/', ensureAuthenticated, getBookings);

module.exports = router;