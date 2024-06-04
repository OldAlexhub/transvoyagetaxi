import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const sendgridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const sendConfirmation = async (
  email,
  name,
  pickupAddress,
  pickupDate,
  pickupTime,
  dropoffAddress,
  fare
) => {
  const pickupAddressCaps = pickupAddress.toUpperCase();
  const destinationCaps = dropoffAddress.toUpperCase();

  const message = {
    to: email,
    from: `info@transvoyagetaxi.com`,
    subject: `Your Booking Confirmation`,
    text: `Hello ${name},\n\nThank you for booking with Trans Voyage Taxi. Here are your booking details:\n\n- Pickup Address: ${pickupAddress}\n- Pickup Date: ${pickupDate}\n- Pickup Time: ${pickupTime}\n- Destination: ${dropoffAddress}\n- Fare: ${fare}\n\nWe are looking forward to serving you and making your journey comfortable and enjoyable.\n\nBest,\nThe Trans Voyage Taxi Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #005a87;">Your Booking Confirmation</h1>
        <p>Hello ${name},</p>
        <p>Thank you for booking with <strong>Trans Voyage Taxi</strong>. We are eagerly awaiting to make your journey comfortable and enjoyable. Here are the details of your booking:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Pickup Address</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${pickupAddressCaps}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Pickup Date</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${pickupDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Pickup Time</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${pickupTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Destination</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${destinationCaps}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Fare</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${fare}</td>
          </tr>
        </table>
        <p>If you have any questions or need further assistance, please do not hesitate to contact us. We are here to help!</p>
        <p>Best wishes,</p>
        <p><strong>The Trans Voyage Taxi Team</strong></p>
      </div>
    `,
  };

  try {
    await sgMail.send(message);
    // console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email", error);
  }
};

export default sendConfirmation;
