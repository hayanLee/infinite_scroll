import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import TodoCard from './components/TodoCard';
import { Todo } from './types/Todo.type';

const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`);
    return res.data;
};

function App() {
    const {
        data: todos,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log('👍', { lastPage, allPages });
            const nextPage = lastPage.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    console.log(todos);

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                {todos?.pages.map((todos: Todo[]) => todos.map((todo) => <TodoCard key={todo.id} todo={todo} />))}
            </div>
            <button
                disabled={!hasNextPage}
                className={clsx(
                    'text-white p-3 rounded',
                    { 'bg-emerald-700 ': !hasNextPage },
                    { 'bg-orange-500 ': isFetchingNextPage },
                    'bg-blue-950 '
                )}
                onClick={() => fetchNextPage()}
            >
                {isFetchingNextPage ? '가져오는 중..' : hasNextPage ? '더보기' : '모두 가져오기 완료'}
            </button>
        </div>
    );
}

export default App;
