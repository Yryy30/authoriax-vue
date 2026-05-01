<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useAuthUser } from '../../../composables/useAuthUser';
import { useProfileUpdate } from '../../../composables/profile/useProfileUpdate';
import { useDeleteAccount } from '../../../composables/profile/useDeleteAccount';
import AppSidebar from '../../../components/AppSidebar.vue';
import Cookies from 'js-cookie';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

interface ValidationErrors {
    [key: string]: string[];
}

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const authUser = useAuthUser();

const { mutate: updateProfile, isPending: isUpdating } = useProfileUpdate();
const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

const name = ref(authUser?.name ?? '');
const email = ref(authUser?.email ?? '');
const errors = reactive<ValidationErrors>({});

const handleUpdate = () => {
    if (!authUser) return;

    Object.keys(errors).forEach(key => delete errors[key]);

    updateProfile(
        { id: authUser.id, data: { name: name.value, email: email.value } },
        {
            onSuccess: () => {
                Cookies.set('user', JSON.stringify({
                    id: authUser.id,
                    name: name.value,
                    email: email.value,
                    role: authUser.role,
                }));
                toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated.', life: 3000 });
            },
            onError: (error: any) => {
                const response = error.response?.data;
                const status = error.response?.status;

                if (status === 422 && response?.data) {
                    Object.assign(errors, response.data);
                    return;
                }

                toast.add({ severity: 'error', summary: 'Failed', detail: response?.message ?? 'Failed to update profile', life: 3000 });
            },
        }
    );
};

const handleDeleteAccount = () => {
    if (!authUser) return;

    confirm.require({
        message: 'Your account will be deleted permanently and cannot be recovered. Continue?',
        header: 'Delete Account',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete My Account',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            deleteAccount(authUser.id, {
                onSuccess: () => {
                    Cookies.remove('token');
                    Cookies.remove('user');
                    toast.add({ severity: 'info', summary: 'Account Deleted', detail: 'Your account has been deleted', life: 3000 });
                    router.push({ name: 'home' });
                },
                onError: (error: any) => {
                    const response = error.response?.data;
                    toast.add({ severity: 'error', summary: 'Failed', detail: response?.message ?? 'Failed to delete account', life: 3000 });
                },
            });
        },
    });
};
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1">
            <AppSidebar />
        </div>
        <div class="lg:col-span-3 flex flex-col gap-6">

            <!-- Update Profil -->
            <Card>
                <template #title>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-user-edit text-primary"></i>
                        <span>UPDATE PROFIL</span>
                    </div>
                </template>
                <template #content>
                    <!-- Role Badge -->
                    <div class="mb-6 px-3 py-2 bg-primary-50 dark:bg-gray-900 border border-primary-200 rounded-lg flex items-center gap-2 w-fit">
                        <i class="pi pi-id-card text-primary text-sm"></i>
                        <span class="text-primary text-sm font-semibold capitalize">{{ authUser?.role }}</span>
                    </div>

                    <form @submit.prevent="handleUpdate" class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label for="name" class="font-semibold">Full Name</label>
                            <InputText
                                id="name"
                                v-model="name"
                                placeholder="Full Name"
                                :invalid="!!errors.name"
                                autocomplete="name"
                            />
                            <small v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</small>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-semibold">Email</label>
                            <InputText
                                id="email"
                                v-model="email"
                                type="email"
                                placeholder="Email"
                                :invalid="!!errors.email"
                                autocomplete="email"
                            />
                            <small v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</small>
                        </div>

                        <div class="flex justify-end">
                            <Button
                                type="submit"
                                label="Save Changes"
                                icon="pi pi-check"
                                :loading="isUpdating"
                            />
                        </div>
                    </form>
                </template>
            </Card>

            <Card>
                <template #title>
                    <div class="flex items-center gap-2 text-red-500">
                        <i class="pi pi-exclamation-triangle"></i>
                        <span>DANGER ZONE</span>
                    </div>
                </template>
                <template #content>
                    <div class="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-gray-900 flex items-center justify-between gap-4">
                        <div>
                            <p class="font-semibold text-red-700">Delete Account</p>
                            <p class="text-sm text-red-500 mt-1">
                                This action is permanent and cannot be undone. All account data will be deleted.
                            </p>
                        </div>
                        <Button
                            label="Delete Account"
                            icon="pi pi-trash"
                            severity="danger"
                            outlined
                            :loading="isDeleting"
                            @click="handleDeleteAccount"
                            class="shrink-0"
                        />
                    </div>
                </template>
            </Card>

        </div>
    </div>
</template>