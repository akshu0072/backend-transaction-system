require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(user) {
  const subject = 'Welcome to Backend Ledger';
  const text = `Hello ${user.name},\n\nThank you for registering at Backend Ledger. We're excited to have you on board!`;
  const html = `<p>Hello ${user.name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p>`;

  await sendEmail(user.email, subject, text, html);
}

async function sendTransactionEmail(userEmail,name,amount,toAccount) {
  const subject = 'Transaction Notification';
  const text = `Hello ${name},\n\nA transaction of ${amount} has been made to ${toAccount}.`;
  const html = `<p>Hello ${name},</p><p>A transaction of ${amount} has been made to ${toAccount}.</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = 'Transaction Failure Notification';
  const text = `Hello ${name},\n\nWe're sorry, but your transaction of ${amount} to ${toAccount} has failed.`;
  const html = `<p>Hello ${name},</p><p>We're sorry, but your transaction of ${amount} to ${toAccount} has failed.</p>`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  transporter,
  sendTransactionEmail,
  sendTransactionFailureEmail
};
