import * as crypto from 'crypto'

const iv = '0000000000000000';
const dbkey = '47b2fe12064da392777982e94a66766557e8eb7860333a48d6b8c545ac811426';

export class Crypto {
    constructor() { }

    static aesEnc(str: string): string {
        let encrypted = '';
        try {
            const key = process.env.JWT_SECRET || '';
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
            encrypted = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
        } catch (error) {
            console.log(error);
            throw error;
        }

        return Buffer.from(encrypted).toString('base64');
    }

    static aesDec(str: string): string {
        let decrypted = '';

        try {
            const key = process.env.JWT_SECRET || '';
            const raw = Buffer.from(str, 'base64').toString('utf-8');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
            decrypted = decipher.update(raw, 'hex', 'utf8') + decipher.final('utf8')
        } catch (error) {
            console.log(error);
            throw error;
        }

        return decrypted;
    }

    static aesDBEnc(str: string): string {
        let encrypted = '';
        try {
            const key = dbkey;
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
            encrypted = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
        } catch (error) {
            console.log(error);
            throw error;
        }

        return Buffer.from(encrypted).toString('base64');
    }

    static aesDBDec(str: string): string {
        let decrypted = '';

        try {
            const key = dbkey;
            const raw = Buffer.from(str, 'base64').toString('utf-8');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
            decrypted = decipher.update(raw, 'hex', 'utf8') + decipher.final('utf8')
        } catch (error) {
            console.log(error);
            throw error;
        }

        return decrypted;
    }
}