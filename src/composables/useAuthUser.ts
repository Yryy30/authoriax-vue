import Cookies from 'js-cookie';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export const useAuthUser = (): User | null => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) as User : null;
};
