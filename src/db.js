import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'Ingcharlie2024*',
    database:'taskdb',
});

pool.on("connect", () => {
    console.log("Database Connected");
});
