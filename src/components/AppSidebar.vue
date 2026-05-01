<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLogout } from '../composables/auth/useLogout';
import { useAuthUser } from '../composables/useAuthUser';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Menu from 'primevue/menu';

const router = useRouter();
const logout = useLogout();
const toast = useToast();
const user = useAuthUser();

const adminMenuItems = [
    {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        command: () => router.push('/admin/dashboard')
    },
    {
        label: 'Users',
        icon: 'pi pi-users',
        command: () => router.push('/admin/users')
    },
];

const userMenuItems = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => router.push('/user/dashboard')
    },
];

const sharedMenuItems = [
    { separator: true },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => router.push('/profile')
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            toast.add({
                severity: 'info',
                summary: 'Logout',
                detail: 'You have been logged out.',
                life: 2000
            });
            logout();
        }
    }
];

const items = computed(() => {
    const roleItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;
    return [...roleItems, ...sharedMenuItems];
});
</script>

<template>
    <Card>
        <template #title>
            <div class="flex items-center gap-2">
                <i class="pi pi-bars text-primary"></i>
                <span>MENU</span>
            </div>
        </template>
        <template #content>
            <Menu :model="items" class="w-full border-0" />
        </template>
    </Card>
</template>