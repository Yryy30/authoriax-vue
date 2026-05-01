import { useMutation } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

export const useUserDelete = () => {

    return useMutation({
        mutationFn: async (id: string) => {   
            const token = Cookies.get('token');

            const response = await Api.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        }
    });
    
};
