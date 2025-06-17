import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generateCertificate = async ({ name, moduleName, certificateId, adminName, date }) => {
    try {
        // Load certificate background image
        const bgImagePath = path.join(process.cwd(), "src", "helper", "certificate.jpg");
        const bgImage = fs.readFileSync(bgImagePath);

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([1086, 768]); // match your image size

        // Embed background image
        const jpgImage = await pdfDoc.embedJpg(bgImage);
        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: 1086,
            height: 768,
        });

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontSizeName = 32;
        const fontSizeModule = 20;
        const fontSizeId = 10;
        const fontSizeAdmin = 20;

        // Center-aligned Name
        const nameText = name.toUpperCase();
        const nameWidth = font.widthOfTextAtSize(nameText, fontSizeName);
        page.drawText(nameText, {
            x: (1086 - nameWidth) / 2,
            y: 400,
            size: fontSizeName,
            font,
            color: rgb(0, 0, 0),
        });

        // Center-aligned Module Name (if needed)
        const moduleWidth = font.widthOfTextAtSize(`Has Completed ${moduleName}`, fontSizeModule);
        page.drawText(`Has Completed ${moduleName}`, {
            x: (1086 - moduleWidth) / 2,
            y: 340,
            size: fontSizeModule,
            font,
            color: rgb(0.2, 0.2, 0.2),
        });

        // Right-aligned Certificate ID
        const certWidth = font.widthOfTextAtSize(certificateId, fontSizeId);
        page.drawText(certificateId, {
            x: 1086 - certWidth - 20,
            y: 10,
            size: fontSizeId,
            font,
            color: rgb(0.3, 0.3, 0.3),
        });

        // Center-aligned Date
        const dateText = `Date: ${date}`;
        const dateWidth = font.widthOfTextAtSize(dateText, fontSizeId);
        page.drawText(dateText, {
            x: 20,
            y: 10,
            size: fontSizeId,
            font,
            color: rgb(1, 1, 1),
        });

        // Center-aligned Admin Name in right half
        const adminText = adminName.toUpperCase();
        const adminWidth = font.widthOfTextAtSize(adminText, fontSizeAdmin);
        const rightHalfCenter = 543 + (543 / 2); // center of right half
        page.drawText(adminText, {
            x: rightHalfCenter - (adminWidth / 2),
            y: 90,
            size: fontSizeAdmin,
            font,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
    catch (err) {
        console.error(err);
        throw new Error("Error generating certificate.");
    }
}
