import { ref } from 'vue';

export const useSearch = (debounceMs = 400) => {
    const search = ref('');
    const searchInput = ref('');

    let debounceTimer: ReturnType<typeof setTimeout>;

    const onSearchInput = (onReset?: () => void) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            search.value = searchInput.value;
            onReset?.();
        }, debounceMs);
    };

    const clearSearch = (onReset?: () => void) => {
        searchInput.value = '';
        search.value = '';
        onReset?.();
    };

    return { search, searchInput, onSearchInput, clearSearch };
};