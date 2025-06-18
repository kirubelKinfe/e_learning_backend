// import { google } from 'googleapis'

// const OAuth2 = google.auth.OAuth2
// const OAuth2_client = new OAuth2(process.env.NODEMAILER_CLIENT_ID, process.env.NODEMAILER_CLIENT_SECRET)
// OAuth2_client.setCredentials({ refresh_token: process.env.NODEMAILER_REFRESH_TOKEN})

// type Mail = {
//     to: string,
//     subject: string, 
//     receiver: string,
//     resetUrl: string
// }


// const sendEmail = ({to, subject, receiver, resetUrl }: Mail) => {
//     const accessToken = OAuth2_client.getAccessToken()

//     const transporter = nodemailer.createTransport({
//         service:'gmail',
//         secure: true,
//         auth: {
//             type: "OAuth2",
//             user: process.env.NODEMAILER_EMAIL,
//             clientId: process.env.NODEMAILER_CLIENT_ID,
//             clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
//             refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
//             accessToken: accessToken
//         }
//     } as nodemailer.TransportOptions)

//     ejs.renderFile('dist/templates/email.ejs', { receiver, resetUrl }, (err, data) => {
//         if (err) {
//           console.log(err);
//         } 
//         else 
//         {
//             const mailOptions = {
//                 from: "E-smart" + '&lt;' + process.env.NODEMAILER_EMAIL + '&gt;',
//                 to,
//                 subject,
//                 html: data
//             }
//             transporter.sendMail(mailOptions, function(err: any, result: any) {
//                 if(err) {
//                     console.log(err)
//                 } else {
//                     console.log(result)
//                 }
//                 transporter.close()
//             })
//         }
//     })
// }

// export default sendEmail


import * as nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'

type Mail = {
    to: string;
    subject: string;
    receiver: string;
    resetUrl: string;
};

async function sendEmail({ to, subject, receiver, resetUrl }: Mail) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });

        const templatePath = path.join(__dirname, 'templates', 'email.ejs');
        ejs.renderFile(templatePath, { receiver, resetUrl }, (err, data) => {
            if (err) {
                console.error('Error rendering email template:', err);
                return;
            }

            const mailOptions = {
                from: `E-smart <${process.env.NODEMAILER_EMAIL}>`,
                to,
                subject,
                html: data
            };

            transporter.sendMail(mailOptions, (err: any, result: any) => {
                if (err) {
                    console.error('Error sending email:', err);
                } else {
                    console.log('Message sent: %s', result.messageId);
                }
                transporter.close();
            });
        });
    } catch (error) {
        console.error('Error in sendEmail function:', error);
    }
}

export default sendEmail;