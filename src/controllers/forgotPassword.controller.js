import User from '../models/user.model.js';
import nodemailer from 'nodemailer';
import { createPasswordResetToken } from '../libs/jwt.js';
import { EMAIL_ADDRESS, EMAIL_PASSWORD, FRONT_URI } from '../config.js';

export const forgotPassword = async(req, res) => {

        const { email } = req.body;

        try {

            const userFound = await User.findOne({ email });

            if(!userFound) return res.status(400).json({ message: "User not found" });

            const tokenReset = await createPasswordResetToken( {id: userFound._id} );

            await User.updateOne(
                { _id: userFound._id},
                { $set: { resetToken: tokenReset} }
            );

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${EMAIL_ADDRESS}`,
                    pass: `${EMAIL_PASSWORD}`
                }
            });

            const emailPort = FRONT_URI;

            const mailOptions = {
                from: EMAIL_ADDRESS,
                to: `${userFound.email}`,
                subject: 'Link to reset your account password',
                html: `<h1>You have 5 minutes to reset your password with the following link: ${emailPort}/reset-password/${userFound._id}/${tokenReset}</h1>`
            }

            transporter.sendMail(mailOptions, (err, response) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({ message: "Something went wrong" });
                }else {
                    // console.log(response);
                    return res.status(200).json({ message: "Recovery email has been sent" });
                }
            });

            // res.json({
            //     id: userFound._id,
            //     username: userFound.username,
            //     email: userFound.email,
            //     resetToken: userFound.resetToken,
            //     createdAt: userFound.createdAt,
            //     updatedAt: userFound.updatedAt,
            // });

            

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}