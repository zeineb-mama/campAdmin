const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendOrderConfirmationEmail = (username, userEmail, userAddress, orderDetails) => {
    const mailOptions = {
        from: '"CampExplore" <' + process.env.EMAIL_USER + '>',
        to: userEmail,
        subject: 'Order Confirmation',
        text: `Thank you for your order! Here are your order details: ${JSON.stringify(orderDetails, null, 2)}`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #4CAF50;">Order Confirmation</h1>
            <p>Hi ${username},</p>
            <p>Thank you for your order! We're excited to let you know that we've received your order and are now processing it. Below are the details of your purchase:</p>
            <h2>Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left;">Product</th>
                        <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: left;">Image</th>
                        <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: right;">Quantity</th>
                        <th style="border-bottom: 2px solid #ddd; padding: 8px; text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderDetails.map(item => `
                    <tr>
                        <td style="border-bottom: 1px solid #ddd; padding: 8px; vertical-align: middle;">${item.name}</td>
                        <td style="border-bottom: 1px solid #ddd; padding: 8px; vertical-align: middle;">
                            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
                        </td>
                        <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: middle;">
                            ${item.quantity}</td>
                        <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right; vertical-align: middle;">
                            €${item.new_price.toFixed(2)}
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
          <p><strong>Total: €${orderDetails.reduce((sum, item) => sum + item.quantity * item.new_price, 0).toFixed(2)}</strong></p>
            <h2>Shipping Information</h2>
            <p>Your order will be shipped to:</p>
            <p>
                ${username}<br>
                ${userAddress.line1}<br>
                ${userAddress.line2 ? `${userAddress.line2}<br>` : ''}
                ${userAddress.city}, ${userAddress.state} ${userAddress.postal_code}<br>
                ${userAddress.country}
            </p>
            <p>Estimated Delivery: 5-7 business days.</p>
            <p>If you have any questions or need further assistance, please feel free to contact our customer service team at <a href="mailto:CampExplore@gmail.com">CampExplore@gmail.com</a>.</p>
            <p>Thank you for shopping with us!</p>
            <p>Sincerely,</p>
            <strong><h3>CampExplore</h3></strong> 
            <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
                <p style="font-size: 0.9em; color: #999;">CampExplore</p>
                <p style="font-size: 0.9em; color: #999;">15 Rue Youri Gagarine 69500 Bron FR</p>
                <p style="font-size: 0.9em; color: #999;">If you have any questions, reply to this email or contact us at <a href="mailto:CampExplore@gmail.com">CampExplore@gmail.com</a>.</p>
            </footer>
        </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

module.exports = sendOrderConfirmationEmail;
