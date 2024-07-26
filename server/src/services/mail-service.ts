import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config({ path: '.env' });

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "000");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const API_URL = process.env.API_URL;

class MailService {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        } as nodemailer.TransportOptions);
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation',
            text: '',
            html: 
            `
                <div>
                    <h1>Hi, dear user!</h1>
                    <h2>You registered on my site recently. To activate your account, use this link</h2>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService();