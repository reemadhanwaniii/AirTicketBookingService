const express = require('express');
const router = express.Router();
const { BookingController } = require('../../controllers/index');
const bookingController = new BookingController();

router.post('/booking',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);

router.get('/info',(req,res) => {
    return res.json({
        message: 'Response from Router'
    });
});

module.exports = router;