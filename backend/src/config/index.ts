import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    smtp: {
        host: string;
        port: number;
        user?: string;
        pass?: string;
        from: string;
    };
}

export const config: Config = {
    port: parseInt(process.env.PORT || "8080", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    smtp: {
        host: process.env.SMTP_HOST || "localhost",
        port: parseInt(process.env.SMTP_PORT || "1025", 10),
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from: process.env.SMTP_FROM || '"Taram CMS" <noreply@taram.com>',
    }
};
