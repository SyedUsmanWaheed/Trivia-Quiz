import crypto from "crypto";

export function encrypt(data: string, key?: string): string {

    key = process.env.APPCRYPTOVERIFICATIONENCRYPTIONKEY || ""

    let algorithm: crypto.CipherCCMTypes = "aes-256-ccm"
    let input_vector: crypto.BinaryLike = process.env.APPCRYPTOVERIFICATIONENCRYPTIONVECTOR || ""

    const cipher = crypto.createCipheriv(algorithm, key, input_vector)

    let encryptedData = cipher.update(data, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    
    return encryptedData
}



export function decrypt(data : string , key?: string): string {

    if (!key) key = process.env.APPCRYPTOVERIFICATIONENCRYPTIONKEY || "";

    let  algorithm : crypto.CipherCCMTypes = "aes-256-ccm"
    let input_vector: crypto.BinaryLike = process.env.APPCRYPTOVERIFICATIONENCRYPTIONVECTOR || ""
    const decipher = crypto.createDecipheriv(algorithm, key, input_vector);

    if (data) {
        let decryptedData = decipher.update(data, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    }
    else return "null";
}