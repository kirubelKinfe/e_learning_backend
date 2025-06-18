"use strict";
// import { google } from 'googleapis'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const nodemailer = __importStar(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
async function sendEmail({ to, subject, receiver, resetUrl }) {
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
        const templatePath = path_1.default.join(__dirname, 'templates', 'email.ejs');
        ejs_1.default.renderFile(templatePath, { receiver, resetUrl }, (err, data) => {
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
            transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                    console.error('Error sending email:', err);
                }
                else {
                    console.log('Message sent: %s', result.messageId);
                }
                transporter.close();
            });
        });
    }
    catch (error) {
        console.error('Error in sendEmail function:', error);
    }
}
exports.default = sendEmail;
