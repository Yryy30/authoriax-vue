<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { useUserById } from '../../../composables/user/useUserById'
import { useUserUpdate } from '../../../composables/user/useUserUpdate'
import AppSidebar from '../../../components/AppSidebar.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

interface ValidationErrors {
    [key: string]: string[];
}

const route = useRoute()
const router = useRouter()
const toast = useToast();

const id = String(route.params.id)

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const errors = reactive<ValidationErrors>({})

const { data: user, isLoading } = useUserById(id)

watchEffect(() => {
    if (user.value) {
        name.value = user.value.name
        email.value = user.value.email
    }
})

const { mutate, isPending } = useUserUpdate()

const updateUser = () => {
    mutate(
        {
            id,
            data: {
                name: name.value,
                email: email.value,
                password: password.value,
            },
        },
        {
            onSuccess: () => {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User updated.',
                    life: 3000
                });
                router.push('/admin/users')
            },
            onError: (error: any) => {
                const response = error.response?.data;
                const status = error.response?.status;

                Object.keys(errors).forEach((key) => delete errors[key]);

                if (status === 422 && response?.data) {
                    Object.assign(errors, response.data);
                    toast.add({
                        severity: 'error',
                        summary: 'Validation Failed',
                        detail: 'Please check your form',
                        life: 3000
                    });
                    return;
                }

                if (status === 409) {
                    errors.email = [response.message];
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: response.message,
                        life: 3000
                    });
                    return;
                }
            },
        }
    )
}

const cancel = () => {
    router.push('/admin/users')
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1">
            <AppSidebar />
        </div>
        <div class="lg:col-span-3">
            <Card>
                <template #title>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-user-edit text-primary"></i>
                        <span>EDIT USER</span>
                    </div>
                </template>
                <template #content>
                    <div v-if="isLoading" class="text-center py-8">
                        <ProgressSpinner />
                        <p class="mt-4 text-gray-600">Loading user data...</p>
                    </div>

                    <form v-else @submit.prevent="updateUser" class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label for="name" class="font-semibold">Full Name</label>
                            <InputText 
                                id="name"
                                v-model="name" 
                                placeholder="Full Name"
                                :invalid="!!errors.name"
                                autocomplete="name"
                            />
                            <small v-if="errors.name" class="text-red-500">
                                {{ errors.name[0] }}
                            </small>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-semibold">Email Address</label>
                            <InputText 
                                id="email"
                                v-model="email" 
                                type="email"
                                placeholder="Email Address"
                                :invalid="!!errors.email"
                                autocomplete="email"
                            />
                            <small v-if="errors.email" class="text-red-500">
                                {{ errors.email[0] }}
                            </small>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="password" class="font-semibold">
                                Password
                                <span class="text-gray-500 text-sm font-normal ml-2">(optional)</span>
                            </label>
                            <Password 
                                inputId="password"
                                v-model="password"
                                placeholder="Password"
                                :invalid="!!errors.password"
                                toggleMask
                                :feedback="false"
                                inputClass="w-full"
                            />
                            <small v-if="errors.password" class="text-red-500">
                                {{ errors.password[0] }}
                            </small>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <Button 
                                type="submit" 
                                label="Update"
                                icon="pi pi-check"
                                :loading="isPending"
                                severity="primary"
                            />
                            <Button 
                                type="button"
                                label="Cancel"
                                icon="pi pi-times"
                                severity="secondary"
                                @click="cancel"
                            />
                        </div>
                    </form>
                </template>
            </Card>
        </div>
    </div>
</template>