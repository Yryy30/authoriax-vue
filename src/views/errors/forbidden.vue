<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthUser } from '../../composables/useAuthUser'
import Card from 'primevue/card'
import Button from 'primevue/button'

const router = useRouter()
const user = useAuthUser()

const goBack = () => {
    if (user?.role === 'admin') {
        router.push('/admin/dashboard')
    } else if (user?.role === 'user') {
        router.push('/user/dashboard')
    } else {
        router.push('/')
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-[70vh]">
        <Card class="w-full max-w-md shadow-lg">
            <template #content>
                <div class="text-center py-6">
                    <i class="pi pi-ban text-6xl text-red-500 mb-4"></i>
                    <h1 class="text-5xl font-bold text-red-500 mb-2">403</h1>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Access Denied</h2>
                    <p class="text-gray-500 mb-8">
                        You are not authorized to access this resource.
                    </p>
                    <Button
                        label="Go Back to Dashboard"
                        icon="pi pi-home"
                        @click="goBack"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>