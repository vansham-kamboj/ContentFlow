import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // ✅ parse JSON body
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'vk01vansham',
      database: 'contentflow',
    });

    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    await connection.end(); // ✅ close the connection

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    // ❌ insecure but as per your request: plain text password comparison
    if (user.password !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
