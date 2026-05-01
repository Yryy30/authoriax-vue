<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useLogin } from '../../composables/auth/useLogin';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Cookies from 'js-cookie';

interface ValidationErrors {
    [key: string]: string[];
}

const router = useRouter();
const toast = useToast();
const { mutate, isPending } = useLogin();

const email = ref<string>('');
const password = ref<string>('');
const errors = reactive<ValidationErrors>({})

const handleLogin = () => {
    mutate(
        { email: email.value, password: password.value },
        {
            onSuccess: (data: any) => {
                Cookies.set('token', data.data.token)
                Cookies.set(
                    'user',
                    JSON.stringify({
                        id: data.data.user.id,
                        name: data.data.user.name,
                        email: data.data.user.email,
                        role: data.data.user.role,
                    })
                )
                
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Welcome back, ' + data.data.user.name,
                    life: 3000
                });

                if (data.data.user.role === 'admin') {
                    router.push('/admin/dashboard')
                } else {
                    router.push('/user/dashboard')
                }
            },
            onError: (error: any) => {
                const response = error.response?.data;
                const status = error.response?.status;

                Object.keys(errors).forEach((key) => delete errors[key]);

                if (status === 422 && response?.data) {
                    Object.assign(errors, response.data);
                    return;
                }

                if (status === 401) {
                    toast.add({
                        severity: 'error',
                        summary: 'Login Failed',
                        detail: response.message,
                        life: 3000
                    });
                    return;
                }
            },
        }
    )
}
</script>

<template>
    <div class="flex items-center justify-center min-h-[80vh]">
        <Card class="w-full max-w-md shadow-lg">
            <template #title>
                <div class="text-center">
                    <i class="pi pi-sign-in text-4xl text-primary mb-3"></i>
                    <h2 class="text-2xl font-bold">LOGIN</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="email" class="font-semibold">Email Address</label>
                        <InputText 
                            id="email"
                            v-model="email" 
                            type="email"
                            placeholder="Email Address"
                            :invalid="!!errors.email"
                            class="w-full"
                            autocomplete="email"
                        />
                        <small v-if="errors.email" class="text-red-500">
                            {{ errors.email[0] }}
                        </small>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password" class="font-semibold">Password</label>
                        <Password 
                            inputId="password"
                            v-model="password"
                            placeholder="Password"
                            :invalid="!!errors.password"
                            :feedback="false"
                            toggleMask
                            class="w-full"
                            inputClass="w-full"
                        />
                        <small v-if="errors.password" class="text-red-500">
                            {{ errors.password[0] }}
                        </small>
                    </div>

                    <Button 
                        type="submit" 
                        label="LOGIN"
                        icon="pi pi-sign-in"
                        :loading="isPending"
                        class="w-full"
                        severity="primary"
                    />

                    <div class="text-center">
                        <span class="text-gray-600">Don't have an account? </span>
                        <router-link to="/register" class="text-primary font-semibold hover:underline">
                            Register
                        </router-link>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>