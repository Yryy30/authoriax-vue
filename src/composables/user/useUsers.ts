import { useQuery } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';
import type { Ref } from 'vue';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface PaginatedUsers {
    data: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
    };
}

export const useUsers = (page: Ref<number>, limit: Ref<number>) => {

    return useQuery<PaginatedUsers, Error>({
        queryKey: ['users', page, limit],

        queryFn: async () => {
            const token = Cookies.get('token');

            const response = await Api.get('/api/users', {
                params: { page: page.value, limit: limit.value },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data as PaginatedUsers;
        },
    });
};
