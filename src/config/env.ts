import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
    JWT_ACCESS_SECREAT: string,
    JWT_REFRESH_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_EXPIRED: string,
};

export const loadEnvVariables = (): EnvConfig => {

    const requireEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_SECREAT", "JWT_REFRESH_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESH_EXPIRED"];
    requireEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missging require environment variable ${key}`)
        }
    });
    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_SECREAT: process.env.JWT_ACCESS_SECREAT as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED as string,
    }
};

export const envVars = loadEnvVariables();
