import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'Message sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to submit message' },
      { status: 500 }
    );
  }
}
