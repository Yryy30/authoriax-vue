<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useUsers } from '../../../composables/user/useUsers'
import { useUserDelete } from '../../../composables/user/useUserDelete'
import AppSidebar from '../../../components/AppSidebar.vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';

const router = useRouter()
const queryClient = useQueryClient()
const confirm = useConfirm();
const toast = useToast();

const page = ref(1)
const limit = ref(10)

const { data, isLoading, isError, error } = useUsers(page, limit)

const users = computed(() => data.value?.data ?? [])
const totalRecords = computed(() => data.value?.meta.total ?? 0)

const onPageChange = (event: { page: number; rows: number }) => {
    page.value = event.page + 1
    limit.value = event.rows
}

const getRowNumber = (index: number) => {
    return (page.value - 1) * limit.value + index + 1
}

const { mutate, isPending } = useUserDelete()

const handleDelete = (id: string, name: string) => {
    confirm.require({
        message: `Are you sure you want to delete user "${name}"?`,
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            mutate(id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['users'] })
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User deleted.',
                        life: 3000
                    });
                },
                onError: () => {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete user',
                        life: 3000
                    });
                }
            })
        }
    });
}

const editUser = (id: string) => {
    router.push(`/admin/users/edit/${id}`)
}

const createUser = () => {
    router.push('/admin/users/create')
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
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-users text-primary"></i>
                            <span>USERS</span>
                        </div>
                        <Button 
                            label="Add User"
                            icon="pi pi-plus"
                            @click="createUser"
                            severity="success"
                        />
                    </div>
                </template>
                <template #content>
                    <div v-if="isLoading" class="text-center py-8">
                        <ProgressSpinner />
                        <p class="mt-4 text-gray-600">Loading...</p>
                    </div>

                    <div v-else-if="isError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="flex items-center gap-2 text-red-700">
                            <i class="pi pi-exclamation-circle"></i>
                            <span>Error: {{ error?.message }}</span>
                        </div>
                    </div>

                    <template v-else>
                        <DataTable 
                            v-if="data && !isLoading" 
                            :value="users" 
                            stripedRows
                            tableStyle="min-width: 50rem"
                        >
                            <!-- <Column field="id" header="ID" sortable style="width: 10%"></Column> -->
                            <Column header="#" style="width: 5%">
                                <template #body="slotProps">
                                    {{ getRowNumber(slotProps.index) }}
                                </template>
                            </Column>
                            <Column field="name" header="Full Name" sortable></Column>
                            <Column field="email" header="Email Address" sortable></Column>
                            <Column field="role" header="Role" sortable></Column>
                            <Column header="Actions" style="width: 20%">
                                <template #body="slotProps">
                                    <div class="flex gap-2">
                                        <Button 
                                            icon="pi pi-pencil"
                                            severity="primary"
                                            size="small"
                                            @click="editUser(slotProps.data.id)"
                                            v-tooltip.top="'Edit'"
                                        />
                                        <Button 
                                            icon="pi pi-trash"
                                            severity="danger"
                                            size="small"
                                            @click="handleDelete(slotProps.data.id, slotProps.data.name)"
                                            :loading="isPending"
                                            v-tooltip.top="'Delete'"
                                        />
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
    
                        <Paginator
                            v-if="data"
                            :rows="limit"
                            :totalRecords="totalRecords"
                            :rowsPerPageOptions="[5, 10, 20, 50]"
                            @page="onPageChange"
                            class="mt-4"
                        />
                    </template>
                </template>
            </Card>
        </div>
    </div>
</template>