import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, number, message } = req.body;
    if (!name || !email || !number || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password or app password
            }
        });

        const mailOptions = {
            from: email, // Sender's email address
            to: ['skenterprise2989@gmail.com', 'saha.biswa2013@gmail.com'], // Send to this email address
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
})

export default router;