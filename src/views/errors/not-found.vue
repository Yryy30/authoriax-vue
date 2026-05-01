<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
    <div class="flex items-center justify-center min-h-[70vh]">
        <Card class="w-full max-w-md shadow-lg">
            <template #content>
                <div class="text-center py-6">
                    <i class="pi pi-question-circle text-6xl text-gray-400 mb-4"></i>
                    <h1 class="text-5xl font-bold text-gray-400 mb-2">404</h1>
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p class="text-gray-500 mb-8">
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <Button
                        label="Go Back to Home"
                        icon="pi pi-home"
                        severity="secondary"
                        @click="router.push('/')"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>