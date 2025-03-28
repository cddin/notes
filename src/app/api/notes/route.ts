import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getAllNotes, createNote } from '@/lib/notes';

// GET /api/notes
export async function GET() {
  try {
    await connectDB();
    const notes = await getAllNotes();
    return NextResponse.json(notes);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST /api/notes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const note = await createNote(title, content);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
} 