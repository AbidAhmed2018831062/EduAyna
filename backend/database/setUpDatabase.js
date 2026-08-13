import pool from "../config/db.js";

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50) NOT NULL,
        class VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL
          CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("students table created successfully");
  } catch (error) {
    console.error("Database setup failed:", error);
  } finally {
    await pool.end();
  }
}

setupDatabase();