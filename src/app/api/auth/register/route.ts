import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vk01vansham',
    database: 'contentflow',
  });

  // Check if user already exists
  const [existing] = await connection.execute(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );

  if (Array.isArray(existing) && existing.length > 0) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Insert user
  const [result] = await connection.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password] // plain password for now
  );

  return NextResponse.json({ message: 'User registered successfully' });
}
