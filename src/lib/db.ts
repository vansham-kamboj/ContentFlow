
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
  connectTimeout: 10000, // 10 seconds
};

let pool: mysql.Pool | null = null;
let poolCreationError: Error | null = null;

function initializePool() {
  if (pool || poolCreationError) { // If already initialized or failed, don't retry here
    return;
  }

  if (!process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE || !process.env.MYSQL_HOST) {
    poolCreationError = new Error('MySQL environment variables (MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST) are not fully set.');
    console.error(poolCreationError.message);
    return;
  }

  try {
    pool = mysql.createPool(dbConfig);
    
    // Asynchronously test the connection without blocking startup
    // Errors here will be caught by individual query attempts if the pool is bad
    pool.getConnection()
      .then(connection => {
        console.log('Successfully connected to MySQL database and obtained a connection.');
        connection.release();
      })
      .catch(err => {
        // This error is critical if it happens after pool creation seemed to succeed
        console.error('Error obtaining a connection from the pool:', err);
        poolCreationError = err; // Mark pool as failed
        if (pool) {
          pool.end().catch(endErr => console.error("Error closing failed pool:", endErr));
          pool = null;
        }
      });
    console.log('MySQL connection pool created (connection test pending).');

  } catch (error: any) {
    console.error('Failed to create MySQL connection pool:', error);
    poolCreationError = error;
    pool = null;
  }
}

// Initialize the pool when this module is first loaded
initializePool();

function getPool(): mysql.Pool | null {
  if (poolCreationError) {
    // If pool creation failed, we don't have a usable pool.
    // Throwing here or returning null depends on how you want to handle it.
    // For API routes, throwing might be better so it results in a 500.
    // console.error("Attempted to get pool, but pool creation failed:", poolCreationError.message);
    return null; // Or throw poolCreationError;
  }
  if (!pool) {
     // console.error("Attempted to get pool, but it's not initialized and no creation error was logged.");
     // This case should ideally not happen if initializePool is called correctly
     // and poolCreationError is set.
     return null;
  }
  return pool;
}

process.on('exit', () => {
  if (pool) {
    pool.end().catch(err => {
      console.error('Error closing MySQL connection pool on exit:', err);
    });
  }
});

export { getPool };
