import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import TodoCard from './components/TodoCard';
import useInfiniteTodos from './hooks/useInfiniteTodos';
import { Todo } from './types/Todo.type';

function App() {
    const { ref, inView } = useInView();
    const { data, status, fetchNextPage, hasNextPage } = useInfiniteTodos();

    useEffect(() => {
        console.log('🔥', inView);
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    if (status === 'pending') return <div>로딩중...</div>;
    if (status === 'error') return <div>에러 발생...</div>;

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                {data?.pages.map((todos: Todo[]) =>
                    todos.map((todo, idx) => {
                        if (todos.length === idx + 1) {
                            // 마지막 요소만 ref를 가짐
                            return <TodoCard todoRef={ref} key={todo.id} todo={todo} />;
                        }
                        return <TodoCard key={todo.id} todo={todo} />;
                    })
                )}
            </div>
            {/* <button
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
            </button> */}
        </div>
    );
}

export default App;
