import { useQuery } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

interface UserCount {
    total: number;
}

export const useUserCount = () => {
    
    return useQuery<UserCount, Error>({
        queryKey: ['users-count'],
        
        queryFn: async () => {
            const token = Cookies.get('token');

            const response = await Api.get('/api/users/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data as UserCount;
        },
    });
};