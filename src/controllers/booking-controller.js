const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();

const create = async(req, res) => {
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

module.exports = {
    create
}