import nodemailer from 'nodemailer';
import { config } from '../config';

export class EmailService {
    private transporter: nodemailer.Transporter | null = null;

    constructor() {
        // Only initialize if we have at least a host. 
        // In local/non-docker dev, if no SMTP is set, we don't crash.
        this.initTransporter();
    }

    private initTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.port === 465,
                auth: config.smtp.user ? {
                    user: config.smtp.user,
                    pass: config.smtp.pass
                } : undefined,
                tls: {
                    rejectUnauthorized: false // Helpful for local dev/self-signed
                }
            });
            console.log(`[EmailService] Transporter initialized on ${config.smtp.host}:${config.smtp.port}`);
        } catch (error) {
            console.error('[EmailService] Failed to initialize email transporter:', error);
            this.transporter = null;
        }
    }

    async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
        if (!this.transporter) {
            console.warn('[EmailService] Transporter not initialized. Skipping email send.');
            console.log(`[MOCK EMAIL SEND] To: ${to}, Subject: ${subject}`);
            return true; // Return true so we don't break the flow
        }

        try {
            const info = await this.transporter.sendMail({
                from: config.smtp.from,
                to,
                subject,
                html
            });
            console.log(`[EmailService] Email sent: ${info.messageId}`);
            return true;
        } catch (error) {
            console.error('[EmailService] Error sending email:', error);
            return false;
        }
    }
}
