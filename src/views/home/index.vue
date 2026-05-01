<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>

<template>
    <div class="flex items-center justify-center min-h-[70vh]">
        <Card class="w-full max-w-4xl shadow-2xl">
            <template #content>
                <div class="text-center py-8">
                    <h1 class="text-5xl font-bold text-primary mb-4">
                        FULLSTACK DEVELOPER
                    </h1>
                    <p class="text-xl text-gray-600 mb-8">
                        Belajar FullStack Developer dengan Rust dan Vue 3 TypeScript
                    </p>
                    
                    <div class="h-px bg-gray-200 my-8"></div>
                    
                    <div class="flex gap-4 justify-center flex-wrap">
                        <router-link to="/register">
                            <Button 
                                label="REGISTER" 
                                icon="pi pi-user-plus"
                                severity="primary"
                                size="large"
                                class="px-8"
                            />
                        </router-link>
                        <router-link to="/login">
                            <Button 
                                label="LOGIN" 
                                icon="pi pi-sign-in"
                                severity="secondary"
                                size="large"
                                class="px-8"
                            />
                        </router-link>
                    </div>

                    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <i class="pi pi-shield text-3xl text-primary mb-3"></i>
                            <h3 class="font-bold text-lg mb-2">Secure Authentication</h3>
                            <p class="text-gray-600">JWT-based authentication dengan bcrypt password hashing</p>
                        </div>
                        
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <i class="pi pi-database text-3xl text-primary mb-3"></i>
                            <h3 class="font-bold text-lg mb-2">Database</h3>
                            <p class="text-gray-600">Menggunakan SQLx untuk koneksi database yang aman</p>
                        </div>
                        
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <i class="pi pi-check-circle text-3xl text-primary mb-3"></i>
                            <h3 class="font-bold text-lg mb-2">Input Validation</h3>
                            <p class="text-gray-600">Validasi input comprehensive di backend dan frontend</p>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>