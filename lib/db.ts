import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT ? (parseInt(process.env.DB_PORT, 10) || 3306) : 3306,
            waitForConnections: true,
            connectionLimit: 10,
        });
    }
    return pool;
}
