import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import fs from "fs";
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
      text: `Hi ${name}, Thanks for contacting with me! This automatic reply is just to let you know that i received your message and i will get back to you with a response as quickly as possible.`,
    };
    saveRequestBodyToJson(req.body);
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

function saveRequestBodyToJson(body) {
  const jsonFilePath = "../data.json";

  fs.writeFileSync(jsonFilePath, JSON.stringify(body), "utf-8");
  console.log("Request body saved as JSON:", jsonFilePath);
}
