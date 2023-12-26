import { Todo } from "@prisma/client";
import axios from "axios";
import { use, useEffect, useState } from "react";

const Home: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = async () => {
    try{
        const response= await axios.get('/api/todos/read');
    setTodos(response.data);
    console.log(response.data);
    }
    catch (error) {
        console.log("erreur lors de la récupération ",error);
        }

    }
    const createTodo = async () => {
        try{
            const response = await axios.post('/api/todos/create', {title});
            setTitle('');
            fetchTodos();
        }
        catch (error) {
            console.log("erreur lors de la création ",error);
            }
    }
    const handleDone = async (todoId: number) => {
        try{
             await axios.put(`/api/todos/update`,{id: todoId,done: true});
            fetchTodos();
            console.log("ok");
        }
        catch (error) {
            console.log("erreur lors de la mise à jour ",error);
            }    

    }
    const handleDelete = async (todoId: number) => {
        if(confirm("Voulez-vous supprimer cette tache ?"))
        {
        try{
             await axios.delete(`/api/todos/delete?id=${todoId}`);
            fetchTodos();
        }
        catch (error) {
            console.log("erreur lors de la suppression ",error);
            }    
        }

    };
    useEffect(() => {  
        fetchTodos();
    }, []);
  
  return (
   <div>
    <form onSubmit={createTodo}>
        <input type="text" placeholder="Ajouter une tache" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">ajouter</button>

    </form>
    <ul>
        {todos.map((todo) => (
            <li key={todo.id}>
                <input type="checkbox" checked={todo.done} onChange={() => handleDone(todo.id)} />
                <span>{todo.title}</span>
                <button onClick={() => handleDelete(todo.id)}>supprimer</button>
            </li>
        ))}
    </ul>
   </div>

  );
}
export default Home;