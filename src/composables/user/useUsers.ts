import { useQuery } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const useUsers = () => {

    return useQuery<User[], Error>({
        queryKey: ['users'],

        queryFn: async () => {
            const token = Cookies.get('token');

            const response = await Api.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return response.data.data as User[];
        }, 
    });
}
