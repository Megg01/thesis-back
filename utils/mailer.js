// require("dotenv").config();
// const nodemailer = require("nodemailer");

// async function sendEmail(email, code) {
//   try {
//     const smtpEndpoint = "smtp.sendgrid.net";

//     const port = 465;

//     const senderAddress = "NAME <ADDRESS>";

//     var toAddress = email;

//     const smtpUsername = "apikey";

//     const smtpPassword = process.env.SENDGRID_KEY;

//     var subject = "Баталгаажуулах имейл";

//     var body_html = `<!DOCTYPE> 
//     <html>
//       <body>
//         <p>Таны баталгаажуулах код : </p> <b>${code}</b>
//       </body>
//     </html>`;

//     // Create the SMTP transport.
//     let transporter = nodemailer.createTransport({
//       host: smtpEndpoint,
//       port: port,
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: smtpUsername,
//         pass: smtpPassword,
//       },
//     });

//     let mailOptions = {
//       from: senderAddress,
//       to: toAddress,
//       subject: subject,
//       html: body_html,
//     };

//     let info = await transporter.sendMail(mailOptions);
//     return { error: false };
//   } catch (error) {
//     console.error("send-email-error", error);
//     return {
//       error: true,
//       message: "Cannot send email",
//     };
//   }
// }

// module.exports = { sendEmail };
