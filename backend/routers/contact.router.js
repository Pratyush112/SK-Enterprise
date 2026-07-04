import express from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation and sanitization rules
const contactValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).escape(),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }).escape(),
    // Accept either number or phone from frontend
    body('number').optional().trim().isLength({ max: 20 }).escape(),
    body('phone').optional().trim().isLength({ max: 20 }).escape(),
    body('company').optional().trim().isLength({ max: 200 }).escape(),
    body('subject').optional().trim().isLength({ max: 300 }).escape(),
];

router.post("/", contactValidationRules, async (req, res) => {
    // Check for honeypot field (botcheck, honeypot, or website)
    if (req.body.botcheck || req.body.honeypot || req.body.website) {
        // Silently succeed for bots without sending email
        return res.status(200).json({ message: "Email sent successfully" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg, details: errors.array() });
    }

    const { name, email, number, phone, message, company, subject } = req.body;
    const phoneOrNumber = phone || number || 'Not provided';
    const companyName = company || 'Not specified';
    const emailSubject = subject || `New Contact Form Inquiry from ${name}`;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'skenterprise2989@gmail.com', // Fixed authenticated sender
            replyTo: email, // Set reply-to as user's email to prevent spoofing
            to: ['skenterprise2989@gmail.com', 'saha.biswa2013@gmail.com'],
            subject: emailSubject,
            text: `Subject: ${emailSubject}\nName: ${name}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phoneOrNumber}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #1e3a8a; margin-top: 0;">${emailSubject}</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phoneOrNumber}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Requirements / Message:</strong></p>
                <p style="background: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; white-space: pre-wrap;">${message}</p>
              </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;