import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const Create = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    is_completed: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(values => ({ ...values, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/todos', values);
  };

  return (
    <div>
      <h1>Add New Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={values.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={values.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>
            <input type="checkbox" name="is_completed" checked={values.is_completed} onChange={handleChange} />
            Completed
          </label>
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default Create;
