import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'vk01vansham',
  database: 'contentflow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  const [results] = await pool.query(sql, values);
  return results as T;
}
