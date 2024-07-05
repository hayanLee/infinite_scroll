import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoCard from './components/TodoCard';
import { Todo } from './types/Todo.type';

const fetchTodos = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_page=1');
    return res.data;
};

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        (async () => {
            const result = await fetchTodos();
            setTodos(result);
        })();
    }, []);

    console.log(todos);
    return (
        <div className='flex flex-col items-center'>
            {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

export default App;
