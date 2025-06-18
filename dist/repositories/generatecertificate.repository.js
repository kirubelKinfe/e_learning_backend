"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
const cloudinary_1 = __importDefault(require("cloudinary"));
const pdfkit_1 = __importDefault(require("pdfkit"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Helper to move to next line
function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
        doc.moveDown();
    }
}
//Dealing with data base operations
class GenerateCertificateRepository {
    async GenerateCertificate({ courseId, userId }) {
        try {
            const user = await models_1.User.findById(userId);
            const course = await models_1.Course.findById(courseId).populate('instructorId');
            if (!user || !course) {
                throw new utils_1.ErrorResponse("User or course not found", 404);
            }
            const UserName = user.firstName + " " + user.lastName;
            const InstractureName = course.instructorId.firstName + " " + course.instructorId.lastName;
            const courseTitle = course.title;
            const courseDuration = course.duration;
            const date = new Date();
            // Create a PDF document using pdfkit
            const doc = new pdfkit_1.default({
                layout: 'landscape',
                size: 'A4',
            });
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
            doc.fontSize(10);
            // Margin
            const distanceMargin = 18;
            doc
                .fillAndStroke('#5a4e6e')
                .lineWidth(20)
                .lineJoin('round')
                .rect(distanceMargin, distanceMargin, doc.page.width - distanceMargin * 2, doc.page.height - distanceMargin * 2)
                .stroke();
            // Header
            const maxWidth = 180;
            const maxHeight = 70;
            doc.image(`${__dirname}/assets/e-smart.png`, 60, 60, {
                fit: [maxWidth, maxHeight],
                align: 'center',
            });
            jumpLine(doc, 9);
            // Content
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(16)
                .fill('#021c27')
                .text('CERTIFICATE OF COMPLETION', {
                align: 'left',
            });
            jumpLine(doc, 1);
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(38)
                .fill('#021c27')
                .text(courseTitle, {
                align: 'left',
            });
            jumpLine(doc, 1);
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(10)
                .fill('#021c27')
                .text('A course by', {
                align: 'left',
            });
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(16)
                .fill('#021c27')
                .text(InstractureName, {
                align: 'left',
            });
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(28)
                .fill('#021c27')
                .text(UserName, {
                align: 'right',
            });
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(12)
                .fill('#021c27')
                .text(`Date: ${date}`, {
                align: 'right',
            });
            doc
                .font(`${__dirname}/fonts/NotoSansJP-Regular.otf`)
                .fontSize(12)
                .fill('#021c27')
                .text(`Length: ${courseDuration}`, {
                align: 'right',
            });
            let url = '';
            // Buffer to hold the PDF content
            let pdfBuffer = Buffer.from([]);
            doc.on('data', chunk => pdfBuffer = Buffer.concat([pdfBuffer, chunk]));
            doc.on('end', async () => {
                try {
                    // Upload the PDF to Cloudinary
                    const uploadResult = await cloudinary_1.default.v2.uploader.upload_stream({
                        resource_type: 'raw',
                        folder: 'certificates', // Change this to your desired Cloudinary folder
                        public_id: `certificate_${user._id}_${course._id}.pdf`,
                        format: 'pdf'
                    }, async (error, result) => {
                        if (error) {
                            throw new utils_1.ErrorResponse("Failed to upload certificate", 500);
                        }
                        else {
                            if (result === undefined) {
                                throw new utils_1.ErrorResponse("No Result found", 500);
                            }
                            url = result?.secure_url;
                            console.log(url);
                            await models_1.CourseProgress.updateOne({ userId, courseId }, {
                                $set: {
                                    certificateUrl: url
                                }
                            });
                        }
                    });
                    // Write the PDF content to the upload stream
                    uploadResult.write(pdfBuffer);
                    uploadResult.end();
                }
                catch (error) {
                    throw new utils_1.ErrorResponse("Internal server error", 500);
                }
            });
            doc.end();
            return url;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = GenerateCertificateRepository;
