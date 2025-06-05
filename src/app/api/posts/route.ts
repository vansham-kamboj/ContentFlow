import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'vk01vansham',
  database: 'contentflow',
};

export async function GET() {
  const conn = await mysql.createConnection(connectionConfig);
  const [rows] = await conn.execute('SELECT * FROM posts ORDER BY created_at DESC');
  await conn.end();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, email } = body;

  if (!title || !content || !email) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const conn = await mysql.createConnection(connectionConfig);
  await conn.execute('INSERT INTO posts (title, content, user_email) VALUES (?, ?, ?)', [title, content, email]);
  await conn.end();
  return NextResponse.json({ message: 'Post added' }, { status: 201 });
}
