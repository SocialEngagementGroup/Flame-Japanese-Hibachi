import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';

export async function GET() {
  try {
    // Attempt to create a test user to verify write access
    const newUser = await prisma.testUser.create({
      data: {
        name: 'Test Entry',
        email: `test-${Date.now()}@example.com`
      }
    });

    // Retrieve all users to verify read access
    const allUsers = await prisma.testUser.findMany();

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      created: newUser,
      totalUsers: allUsers.length,
      data: allUsers
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Database connection failed', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
