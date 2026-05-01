import { useMutation } from '@tanstack/vue-query';
import Api from '../../services/api';
import Cookies from 'js-cookie';

interface ProfileUpdateRequest {
    name: string;
    email: string;
}

export const useProfileUpdate = () => {
    
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: ProfileUpdateRequest }) => {
            const token = Cookies.get('token');

            const response = await Api.put(`/api/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        },
    });
};