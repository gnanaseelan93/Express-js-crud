import pool from "../config/db.js";


const createUserTableQuery =async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
    `;
    try {
        pool.query(queryText);
        console.log("User table created or already exists.");
    } catch (error) {
        console.error("Error creating user table:", error);
    }
};

export default createUserTableQuery;