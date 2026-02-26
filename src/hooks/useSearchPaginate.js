import { useState } from 'react';

export function useSearchPaginate(initialFilters) {
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const limpiarFiltros = () => {
        setFilters(initialFilters);
        setPage(1);
    };

    const onPageChange = (newPage) => setPage(newPage);

    const onRowsPerPageChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
    };

    return {
        filters,
        page,
        limit,
        setFilters,
        handleFilterChange,
        limpiarFiltros,
        onPageChange,
        onRowsPerPageChange,
    };
}
