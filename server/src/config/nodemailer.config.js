import { envProvider } from "../constants";
import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: envProvider.EMAIL, 
        pass: envProvider.PASSWORD,
    },
});


export const mailOptions = (to, subject, html) => ({
    from: "Maargdarshak <no-reply@maargdarshak.com>",
    to: to,
    subject: subject,
    html: html
})