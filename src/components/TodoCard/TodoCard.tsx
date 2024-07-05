import { Todo } from '../../types/Todo.type';

interface TodoCardProps {
    todo: Todo;
    todoRef?: React.Ref<HTMLDivElement>;
}

function TodoCard({ todoRef, todo }: TodoCardProps) {
    return (
        <div className='bg-yellow-100 p-4 my-4 rounded' ref={todoRef}>
            <p>{todo.title}</p>
        </div>
    );
}

export default TodoCard;
