// hooks/useInfiniteTodos.js
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`);
    return res.data;
};

const useInfiniteTodos = () => {
    return useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log('👍', { lastPage, allPages });
            const nextPage = lastPage.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });
};

export default useInfiniteTodos;
