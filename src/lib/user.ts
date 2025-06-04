
// src/lib/user.ts
import { getPool } from './db';
import type { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
  avatar_url?: string | null;
}

interface UserRow extends RowDataPacket, User {}

export async function findUserByUsername(username: string): Promise<User | null> {
  const pool = getPool();
  if (!pool) {
    console.error("Database connection pool is not available for findUserByUsername.");
    throw new Error("Database connection unavailable.");
  }

  const sql = 'SELECT id, username, name, email, avatar_url FROM users WHERE username = ?';
  try {
    const [rows] = await pool.execute<UserRow[]>(sql, [username]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null; // User not found
  } catch (error) {
    console.error('Error finding user by username in MySQL:', error);
    // Re-throw a more generic error or a specific one if you can identify the cause
    throw new Error('Failed to query database for user.');
  }
}
