const { initPayment, validatePayment,payment } = require('../controllers/PaymentController');
const ensureAuthenticated = require('../middlewares/Auth');

const router = require('express').Router();

router.post('/init', ensureAuthenticated, initPayment);
//router.post('/validate/:bookingId', ensureAuthenticated, validatePayment);
router.get('/validate/:bookingId', validatePayment); // For GET callbacks
router.post('/validate/:bookingId', validatePayment); // For POST callbacks


router.get('/payment/:transactionId', payment);  // Changed from 'tranId' to 'transactionId'


module.exports = router;