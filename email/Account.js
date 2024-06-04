import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const sendgridAPIKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = async (email, fname) => {
  const message = {
    to: email,
    from: `info@transvoyagetaxi.com`,
    subject: "Welcome to Denver!",
    text: `Thank you ${fname} for registering with Trans Voyage Taxi. We are looking forward to serving you!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #005a87;">Welcome to Denver, ${fname}!</h1>
        <p>Thank you for registering with <strong>Trans Voyage Taxi</strong>. We are thrilled to have you on board and look forward to serving you.</p>
        <p>Your journey with us will be filled with great experiences and the best services that we have to offer. We are committed to ensuring your transportation needs are met with the highest standards of quality and comfort.</p>
        <p>Should you have any questions or need assistance, please feel free to reach out to us. Our team is here to support you every step of the way.</p>
        <p>Welcome aboard!</p>
        <p><strong>The Trans Voyage Taxi Team</strong></p>
        <hr>
        <footer>
          <p>Follow us on <a href="http://www.transvoyagetaxi.com">our Website</a></p>
        </footer>
      </div>
      `,
  };

  try {
    await sgMail.send(message);
    // console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
};

export default sendWelcomeEmail;
