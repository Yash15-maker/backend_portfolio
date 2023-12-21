import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email, name, message } = req.body;
  console.log(email, name, message);
  try {
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      name: name,
      subject: `Hii ${name} received the message`,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email not send successfully!");
        res.send({ message: "UnSuccessfully" });
      } else {
        console.log("Email send successfully!");
        res.send({ message: "Successfully" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});
