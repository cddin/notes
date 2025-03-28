'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { useApi } from '@/hooks/useApi';

export default function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  // const { data: notes, loading, fetchData } = useFetch<Note[]>('/api/notes');
  const { data: notes, get:fetchData, create:createNote, update:updateNote, remove:removeNote, loading, error } = useApi('/api/notes');


  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (editingNote) {
        updateNote(editingNote._id, { title, content });
      } else {
        createNote({ title, content });
      }
      resetForm();
    
  };

  // Handle note deletion
  const handleDelete = async (id: string) => {
    removeNote(id);
  };

  // Handle edit button click
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingNote(null);
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
        {notes && notes.map((note:Note) => (
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