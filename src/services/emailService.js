const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOrderConfirmation = (to, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Order Confirmation',
        text: `Thank you for your order! Here are your order details: ${JSON.stringify(orderDetails)}`,
        html: `<h1>Thank you for your order!</h1><p>Here are your order details:</p><pre>${JSON.stringify(orderDetails, null, 2)}</pre>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendOrderConfirmation,
};