const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ibalarm.bot@gmail.com',
    pass: 'Q6rIgD51DG1AWfcGG6LR'
  }
});

const sendEmail = ({ subject, text }) =>
  new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'ibalarm.bot@gmail.com',
      to: process.env.EMAIL,
      subject,
      text
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });

module.exports = {
  sendEmail
};
