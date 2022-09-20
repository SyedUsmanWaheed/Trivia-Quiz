import crypto from "crypto";

export function encrypt(data, key){
    if (!key) key = process.env.APPCRYPTOVERIFICATIONENCRYPTIONKEY;
    const cipher = crypto.createCipheriv("aes-256-cbc", key, process.env.APPCRYPTOVERIFICATIONENCRYPTIONVECTOR)
    let encryptedData = cipher.update(data, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
}
export function decrypt(data, key){
    if (!key) key = process.env.APPCRYPTOVERIFICATIONENCRYPTIONKEY;
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, process.env.APPCRYPTOVERIFICATIONENCRYPTIONVECTOR);
    if (data) {
        let decryptedData = decipher.update(data, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    }
    else return null;
}