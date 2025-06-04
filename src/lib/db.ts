// src/lib/db.ts
import mysql from 'mysql2/promise';

// It's good practice to use environment variables for credentials
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

function getPool() {
  if (pool) {
    return pool;
  }
  if (!process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
    console.error('MySQL environment variables (MYSQL_USER, MYSQL_DATABASE) are not fully set.');
    // In a real app, you might throw an error or handle this more gracefully.
    // For now, this prevents the pool from being created without necessary config.
    // This will likely cause errors downstream if the DB is actually needed.
    // Consider if a default/mock implementation is better if DB is optional for some parts.
  }
  try {
    pool = mysql.createPool(dbConfig);
    // Test the connection
    pool.getConnection()
      .then(connection => {
        console.log('Successfully connected to MySQL database.');
        connection.release();
      })
      .catch(err => {
        console.error('Error connecting to MySQL database:', err);
        // If connection fails, nullify the pool so attempts to use it will fail clearly
        // or re-throw/handle as appropriate for your application's startup.
        pool = null; 
      });
  } catch (error) {
    console.error('Failed to create MySQL connection pool:', error);
    pool = null; // Ensure pool is null if creation fails
  }
  return pool;
}


// Graceful shutdown
// Not strictly necessary for Next.js serverless functions but good practice for long-running Node apps.
// Might be more relevant if you have long-lived processes or scripts using this.
process.on('exit', () => {
  if (pool) {
    pool.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection pool:', err);
      } else {
        console.log('MySQL connection pool closed.');
      }
    });
  }
});

export { getPool };
