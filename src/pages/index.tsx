// crud todo with rfc
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from '../types';
import React from 'react';

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos/read');
      setTodos(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/todos/create', { title });
      setTitle('');
      fetchTodos();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche", error);
    }
  };

  const handleToggleDone = async (todoId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/update`, { id: todoId, done: true  });
      fetchTodos();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  const handleDelete = async (todoId: number) => {
    try {
      await axios.delete(`/api/todos/delete?id=${todoId}`);
      fetchTodos();
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Ajouter une tâche..." 
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => handleToggleDone(todo.id)}>
              {todo.done ? 'Marquer comme non fait' : 'Marquer comme fait'}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
