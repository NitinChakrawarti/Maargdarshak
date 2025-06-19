import Certificate from "../models/certificate.model.js";

class CertificateService {
    async verifyCertificate(userId) {
        const certificate = await Certificate.find({ userId });
        if (!certificate) {
            return false;
        }
        console.log("Certificate found:", certificate);

        return certificate; 
    }


}

export default new CertificateService();