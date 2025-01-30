const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/server-config');


class BookingController {
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = {message: 'SUCCESS'}
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Successfully published the event'
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("From booking controller", response);
            return res.status(StatusCodes.OK).json({
                data: response,
                message:'Successfully completed booking',
                err: {},
                success: true
            });
        } catch (error) {
            console.log("From booking controller error", error);
            return res.status(error.statusCode).json({
                data: {},
                message:error.message,
                err: error.explanation,
                success: false
            });
        }
    }

}


module.exports = BookingController;