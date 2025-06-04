
// src/app/api/auth/login/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { findUserByUsername } from '@/lib/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required and must be a string.' }, { status: 400 });
    }

    const user = await findUserByUsername(username);

    if (user) {
      return NextResponse.json(user);
    } else {
      // User explicitly not found in the database
      return NextResponse.json({ error: 'User not found or invalid credentials.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    
    // Check for specific known error messages from our DB/user libs
    if (errorMessage.includes("Database connection unavailable") || errorMessage.includes("Failed to query database")) {
        return NextResponse.json({ error: 'Login service temporarily unavailable. Please try again later.' }, { status: 503 });
    }

    // Generic error for other unexpected issues
    return NextResponse.json({ error: 'An internal server error occurred during login.' }, { status: 500 });
  }
}
