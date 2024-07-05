import { Todo } from '../../types/Todo.type';

interface TodoCardProps {
    todo: Todo;
}

function TodoCard({ todo }: TodoCardProps) {
    return (
        <div className='bg-yellow-100 p-4 my-4 rounded'>
            <p>{todo.title}</p>
        </div>
    );
}

export default TodoCard;
