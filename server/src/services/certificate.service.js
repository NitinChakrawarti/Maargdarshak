import Certificate from "../models/certificate.model.js";

class CertificateService {
    async verifyCertificate(resourceId) {
        const certificate = await Certificate.findById(resourceId)
        if (!certificate) {
            return false;
        }
        console.log("Certificate found:", certificate);

        return certificate;
    }

    async getUserCertificates(userId) {
        const certificates = await Certificate.find({ userId });
        if (!certificates || certificates.length === 0) {
            return [];
        }
        console.log("Certificates found for user:", userId, certificates);

        return certificates;
    }
}

export default new CertificateService();