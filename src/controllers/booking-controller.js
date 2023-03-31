const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMAINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {
    async create(req,res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            });
        }catch(error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }

    async sendMessageToQueue(req,res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a noti from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: 'reemadhanwani55@gmail.com',
                notificationTime: '2023-03-29T13:34:00.000'
            },
            service: 'CREATE_TICKET'
        }
        publishMessage(channel,REMAINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message : 'Succesfully published the event'
        })
    }
}


module.exports = BookingController;