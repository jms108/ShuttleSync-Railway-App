const { searchTrains, getTrainDetails } = require('../controllers/TrainController');

const router = require('express').Router();

router.get('/search', searchTrains);
router.get('/:id', getTrainDetails);

module.exports = router;