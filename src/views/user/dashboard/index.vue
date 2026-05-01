<script setup lang="ts">
import AppSidebar from '../../../components/AppSidebar.vue';
import { useAuthUser } from '../../../composables/useAuthUser';
import Card from 'primevue/card';

const user = useAuthUser();
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
                        <i class="pi pi-home text-primary"></i>
                        <span>DASHBOARD</span>
                    </div>
                </template>
                <template #content>
                    <!-- Welcome Banner -->
                    <div class="p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="bg-primary text-white rounded-full p-4">
                                <i class="pi pi-user text-3xl"></i>
                            </div>
                            <div>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Hola,</p>
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ user?.name }}</h2>
                                <p class="text-gray-500 dark:text-gray-200 text-sm mt-1">{{ user?.email }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Info Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div class="p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-gray-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-500 mb-1">Account Status</p>
                                    <p class="text-xl font-bold text-green-600">Active</p>
                                </div>
                                <i class="pi pi-check-circle text-4xl text-green-600 opacity-20"></i>
                            </div>
                        </div>

                        <div class="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-gray-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-500 mb-1">Role</p>
                                    <p class="text-xl font-bold text-blue-600 capitalize">{{ user?.role }}</p>
                                </div>
                                <i class="pi pi-id-card text-4xl text-blue-600 opacity-20"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Info Notice -->
                    <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                        <i class="pi pi-info-circle text-yellow-500 text-xl"></i>
                        <p class="text-yellow-700 text-sm">
                            You are logged in as a <strong>user</strong>. Management features are only available for admins.
                        </p>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>