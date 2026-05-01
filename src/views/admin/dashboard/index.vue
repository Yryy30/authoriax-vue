<script setup lang="ts">
import AppSidebar from '../../../components/AppSidebar.vue';
import { useAuthUser } from '../../../composables/useAuthUser';
import { useUserCount } from '../../../composables/user/useUserCount';
import Card from 'primevue/card';

const user = useAuthUser();
const { data: countData, isLoading: isCountLoading } = useUserCount();
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
                        <i class="pi pi-chart-line text-primary"></i>
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

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <!-- Users Count -->
                        <div class="p-4 border border-primary-200 rounded-lg bg-primary-50 dark:bg-gray-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-500 mb-1">Users Count</p>
                                    <p class="text-2xl font-bold text-primary">
                                        <span v-if="isCountLoading">
                                            <i class="pi pi-spin pi-spinner"></i>
                                        </span>
                                        <span v-else>{{ countData?.total ?? 0 }}</span>
                                    </p>
                                </div>
                                <i class="pi pi-users text-4xl text-primary opacity-20"></i>
                            </div>
                        </div>

                        <!-- Active Sessions -->
                        <div class="p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-gray-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-500 mb-1">Active Sessions</p>
                                    <p class="text-2xl font-bold text-green-600">1</p>
                                </div>
                                <i class="pi pi-check-circle text-4xl text-green-600 opacity-20"></i>
                            </div>
                        </div>

                        <!-- System Status -->
                        <div class="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-gray-900">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-500 mb-1">System Status</p>
                                    <p class="text-2xl font-bold text-orange-600">Online</p>
                                </div>
                                <i class="pi pi-server text-4xl text-orange-600 opacity-20"></i>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>