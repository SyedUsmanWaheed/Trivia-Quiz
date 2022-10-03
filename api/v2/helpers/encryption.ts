import crypto from "crypto";

export function encrypt(data: string, key?: string): string {

    key = "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67" || ""

    let algorithm: crypto.CipherCCMTypes = "aes-256-ccm"
    let input_vector: crypto.BinaryLike = "MIGeMA0GCSqGSIb3" || ""
    console.log(input_vector)

    const cipher = crypto.createCipheriv(algorithm, key, input_vector)

    let encryptedData = cipher.update(data, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    
    return encryptedData
}



export function decrypt(data : string , key?: string): string {

    if (!key) key = "nVRQO_K1GVt}yH1Plkl9?V~EWu-/1y67" || "";

    let  algorithm : crypto.CipherCCMTypes = "aes-256-ccm"
    let input_vector: crypto.BinaryLike = "MIGeMA0GCSqGSIb3" || ""
    const decipher = crypto.createDecipheriv(algorithm, key, input_vector);

    if (data) {
        let decryptedData = decipher.update(data, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    }
    else return "null";
}