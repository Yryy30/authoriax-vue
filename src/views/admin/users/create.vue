<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import AppSidebar from '../../../components/AppSidebar.vue';
import { useUserCreate } from '../../../composables/user/useUserCreate'
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import SelectButton from 'primevue/selectbutton';

interface ValidationErrors {
    [key: string]: string[];
}

const router = useRouter()
const toast = useToast();

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const role = ref<string>('')
const errors = reactive<ValidationErrors>({})

const { mutate, isPending } = useUserCreate()

const storeUser = () => {
    mutate(
        {
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
        },
        {
            onSuccess: () => {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User created.',
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

const roleOpt = ref(['admin', 'user']);
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
                        <i class="pi pi-user-plus text-primary"></i>
                        <span>ADD USER</span>
                    </div>
                </template>
                <template #content>
                    <form @submit.prevent="storeUser" class="flex flex-col gap-4">
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
                            <label for="password" class="font-semibold">Password</label>
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

                        <div class="flex flex-col gap-2">
                            <label for="role" class="font-semibold">Role</label>
                            <SelectButton 
                                id="role"
                                v-model="role"
                                :options="roleOpt"
                                :invalid="!!errors.role"
                            />
                            <small v-if="errors.role" class="text-red-500">
                                {{ errors.role[0] }}
                            </small>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <Button 
                                type="submit" 
                                label="Save"
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