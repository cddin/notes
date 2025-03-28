import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getNoteById, updateNote, deleteNote } from '@/lib/notes';

// GET /api/notes/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const note = await getNoteById(params.id);
    return NextResponse.json(note);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// PUT /api/notes/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const note = await updateNote(params.id, title, content);
    return NextResponse.json(note);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// DELETE /api/notes/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await deleteNote(params.id);
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
} 