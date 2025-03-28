'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { useFetch } from "../hooks/notes/useFetch";

export default function Notes() {
  // const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [error, setError] = useState('');
  const { data: notes, loading, fetchData } = useFetch<Note[]>('/api/notes');

  // Load notes on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // TODO: create hook for api call

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    setError('');

    try {
      if (editingNote) {
        // Update existing note
        const response = await fetch(`/api/notes/${editingNote._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) throw new Error('Failed to update note');
      } else {
        // Create new note
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) throw new Error('Failed to create note');
      }

      // Reset form and refresh notes
      setTitle('');
      setContent('');
      setEditingNote(null);
      fetchData();
    } catch (err) {
      setError(editingNote ? `Failed to update note ${err}` : 'Failed to create note');
    }
  };

  // Handle note deletion
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete note');
      fetchData();
    } catch (err) {
      setError(`Failed to delete note: ${err}`);
    }
  };

  // Handle edit button click
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notes</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && <p>Loading...</p>}

      {/* Note form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingNote ? 'Update Note' : 'Create Note'}
        </button>
      </form>

      {/* Notes list */}
      <div className="grid gap-4">
        {notes && notes.map((note) => (
          <div
            key={note._id}
            className="border rounded p-4 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.content}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(note)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 