const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullname, email, telefone, message, date } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [email, 'admin@example.com'], // Send to both user and admin
    subject: 'New Contact Form Submission',
    text: `
      Name: ${fullname}
      Email: ${email}
      Phone: ${telefone}
      Date of Birth: ${date}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};