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
}

export default new CertificateService();