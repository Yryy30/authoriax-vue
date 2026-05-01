<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useRegister } from "../../composables/auth/useRegister";

interface ValidationErrors {
    [key: string]: string[];
}

const router = useRouter();
const toast = useToast();
const { mutate, isPending } = useRegister();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const errors = reactive<ValidationErrors>({});

const handleRegister = () => {
    mutate(
        {
            name: name.value,
            email: email.value,
            password: password.value,
        },
        {
            onSuccess: () => {
                toast.add({
                    severity: 'success',
                    summary: 'Register Successful',
                    detail: 'Please login to continue',
                    life: 3000
                });
                router.push("/login");
            },
            onError: (error: any) => {
                const response = error.response?.data;
                const status = error.response?.status;

                Object.keys(errors).forEach((key) => delete errors[key]);

                if (status === 422 && response?.data) {
                    Object.assign(errors, response.data);
                    return;
                }

                if (status === 409) {
                    toast.add({
                        severity: 'error',
                        summary: 'Register Failed',
                        detail: response.message,
                        life: 3000
                    });
                    return;
                }
            },
        }
    );
};
</script>

<template>
    <div class="flex items-center justify-center min-h-[80vh]">
        <Card class="w-full max-w-md shadow-lg">
            <template #title>
                <div class="text-center">
                    <i class="pi pi-user-plus text-4xl text-primary mb-3"></i>
                    <h2 class="text-2xl font-bold">REGISTER</h2>
                </div>
            </template>
            <template #content>
                <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="name" class="font-semibold">Full Name</label>
                        <InputText 
                            id="name"
                            v-model="name" 
                            placeholder="Full Name"
                            :invalid="!!errors.name"
                            class="w-full"
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
                            toggleMask
                            class="w-full"
                            inputClass="w-full"
                        >
                            <template #footer>
                                <p class="mt-2 text-sm">Suggestions:</p>
                                <ul class="pl-2 ml-2 mt-0 text-sm" style="line-height: 1.5">
                                    <li>At least one lowercase</li>
                                    <li>At least one uppercase</li>
                                    <li>At least one numeric</li>
                                    <li>Minimum 6 characters</li>
                                </ul>
                            </template>
                        </Password>
                        <small v-if="errors.password" class="text-red-500">
                            {{ errors.password[0] }}
                        </small>
                    </div>

                    <Button 
                        type="submit" 
                        label="REGISTER"
                        icon="pi pi-user-plus"
                        :loading="isPending"
                        class="w-full"
                        severity="primary"
                    />

                    <div class="text-center">
                        <span class="text-gray-600">Have an account? </span>
                        <router-link to="/login" class="text-primary font-semibold hover:underline">
                            Login
                        </router-link>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>