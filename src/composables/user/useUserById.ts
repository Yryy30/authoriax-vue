import { useQuery } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

export interface User {
    id: string;
    name: string;
    email: string;
}

export const useUserById = (id: string) => {

    return useQuery<User, Error>({
        queryKey: ['user', id],

        queryFn: async () => {
            const token = Cookies.get('token');

            const response = await Api.get(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data as User;
        },
    });
};