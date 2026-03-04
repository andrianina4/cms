import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

export const config: Config = {
    port: parseInt(process.env.PORT || "8080", 10),
    nodeEnv: process.env.NODE_ENV || "development",
};
