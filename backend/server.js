const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const verificationCodes = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply@cpnacademy.co.uk',
        pass: 'P3n1$land',
    },
});

app.post('/send-code', (req, res) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    verificationCodes[email] = hashedCode;

    transporter.sendMail(
        {
            from: '"CPN Academy" <no-reply@cpnacademy.co.uk>',
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${code}`,
        },
        (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Failed to send email.' });
            }
            res.status(200).send({ message: 'Verification email sent.' });
        }
    );
});

app.post('/verify-code', (req, res) => {
    const { email, verificationCode } = req.body;
    const hashedInput = crypto.createHash('sha256').update(verificationCode).digest('hex');

    if (verificationCodes[email] === hashedInput) {
        delete verificationCodes[email];
        res.status(200).send({ message: 'Verification successful!' });
    } else {
        res.status(400).send({ message: 'Invalid verification code.' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

