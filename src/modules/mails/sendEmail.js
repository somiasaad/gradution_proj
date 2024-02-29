import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { html } from './html.js';

export const sendToEmail = async (options) => {
 const   transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "mohamedmashhour893@outlook.com",
            pass: "mesho***53536827",
        },
    });
    let token = jwt.sign({ email: options.email }, 'email123456')
    const info = await transporter.sendMail({
        from: '"Confirm Your Email 👻" <mohamedmashhour893@outlook.com>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: html(token), // html body
    });
}
export const sendToEmailToResetPassword = async (options) => {
    const   transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "mohamedmashhour893@outlook.com",
            pass: "mesho***53536827",
        },
    });
    let token = jwt.sign({ email: options.email }, 'email21848')
    console.log(token);
    const info = await transporter.sendMail({
        from: '"Reset Your Password 👻" <mohamedmashhour893@outlook.com>', // sender address
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: `https://speech-sapm.onrender.com/users/verfiyResetPassword/${token}`, // html body
    });
}