import React, { useState } from 'react';
import { createStory } from '../services/api';

const CreateStoryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState<string[]>(['']);
  const [themeRoomId, setThemeRoomId] = useState('');
  const [prev, setPrev] = useState<string[]>(['']);
  const [next, setNext] = useState<string[]>(['']);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...author];
    values[index] = event.target.value;
    setter(values);
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => () => {
    setter((prevValues) => [...prevValues, '']);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createStory({ title, type, content, author, themeRoomId, prev, next });
      setTitle('');
      setType('');
      setContent('');
      setAuthor(['']);
      setThemeRoomId('');
      setPrev(['']);
      setNext(['']);
      setError(null);
    } catch (err) {
      setError('Failed to create story');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Authors:</label>
        {author.map((a, index) => (
          <input key={index} type="text" value={a} onChange={handleChange(setAuthor, index)} required />
        ))}
        <button type="button" onClick={handleAddField(setAuthor)}>Add Author</button>
      </div>
      <div>
        <label>Theme Room ID:</label>
        <input type="text" value={themeRoomId} onChange={(e) => setThemeRoomId(e.target.value)} required />
      </div>
      <div>
        <label>Prev:</label>
        {prev.map((p, index) => (
          <input key={index} type="text" value={p} onChange={handleChange(setPrev, index)} required />
        ))}
        <button type="button" onClick={handleAddField(setPrev)}>Add Prev</button>
      </div>
      <div>
        <label>Next:</label>
        {next.map((n, index) => (
          <input key={index} type="text" value={n} onChange={handleChange(setNext, index)} required />
        ))}
        <button type="button" onClick={handleAddField(setNext)}>Add Next</button>
      </div>
      <button type="submit">Create Story</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateStoryForm;
