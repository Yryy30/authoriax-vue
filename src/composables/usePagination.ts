import { ref } from 'vue';

export const usePagination = (defaultLimit = 10) => {
    const page = ref(1);
    const limit = ref(defaultLimit);

    const onPageChange = (event: { page: number; rows: number }) => {
        page.value = event.page + 1;
        limit.value = event.rows;
    };

    const resetPage = () => {
        page.value = 1;
    };

    const getRowNumber = (index: number) => {
        return (page.value - 1) * limit.value + index + 1;
    };

    return { page, limit, onPageChange, resetPage, getRowNumber };
};