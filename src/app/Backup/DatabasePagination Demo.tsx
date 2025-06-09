import React, { useState, useEffect } from 'react';

// Simulación de API call para obtener datos paginados
const fetchPaginatedData = async (page, pageSize, sortModel, filterModel) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // En una implementación real, estos parámetros se enviarían al backend
  const params = {
    page: page + 1, // Backend suele usar 1-based indexing
    pageSize,
    sortField: sortModel[0]?.field,
    sortDir: sortModel[0]?.sort,
    filters: filterModel
  };
  
  // Datos simulados - en realidad vendría del backend
  const allData = Array.from({ length: 1247 }, (_, i) => ({
    id: i + 1,
    name: `Usuario ${i + 1}`,
    email: `user${i + 1}@example.com`,
    department: ['IT', 'HR', 'Finance', 'Marketing'][i % 4],
    salary: 30000 + (i * 1000) % 70000,
    createdAt: new Date(2020, 0, 1 + i % 1000).toISOString().split('T')[0]
  }));
  
  // Simular filtrado y ordenamiento en backend
  let filteredData = allData;
  
  // Aplicar filtros
  if (filterModel.items?.length > 0) {
    filterModel.items.forEach(filter => {
      if (filter.value) {
        filteredData = filteredData.filter(item => {
          const value = item[filter.field]?.toString().toLowerCase() || '';
          return value.includes(filter.value.toLowerCase());
        });
      }
    });
  }
  
  // Aplicar ordenamiento
  if (sortModel[0]) {
    const { field, sort } = sortModel[0];
    filteredData.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (sort === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }
  
  // Paginación
  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedData = filteredData.slice(start, end);
  
  return {
    data: paginatedData,
    total: filteredData.length,
    page,
    pageSize
  };
};

// Componente StripedDataGrid simulado (usando tabla HTML con estilos similares)
const StripedDataGrid = ({ 
  rows, 
  columns, 
  loading, 
  paginationMode,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterModelChange,
  pageSizeOptions 
}) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filters, setFilters] = useState({});

  const handleSort = (field) => {
    let newDirection = 'asc';
    if (sortedColumn === field && sortDirection === 'asc') {
      newDirection = 'desc';
    } else if (sortedColumn === field && sortDirection === 'desc') {
      newDirection = null;
      setSortedColumn(null);
    } else {
      setSortedColumn(field);
    }
    setSortDirection(newDirection);
    
    const newSortModel = newDirection ? [{ field, sort: newDirection }] : [];
    onSortModelChange?.(newSortModel);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    const filterItems = Object.entries(newFilters)
      .filter(([_, val]) => val.trim())
      .map(([field, value]) => ({ field, operator: 'contains', value }));
    
    onFilterModelChange?.({ items: filterItems });
  };

  const totalPages = Math.ceil(rowCount / paginationModel.pageSize);

  return (
    <div className="w-full">
      {loading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-700">Cargando datos...</span>
        </div>
      )}
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.headerName}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        <span className={`text-xs ${sortedColumn === column.field && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}>▲</span>
                        <span className={`text-xs ${sortedColumn === column.field && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}>▼</span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
            <tr className="bg-gray-25">
              {columns.map((column) => (
                <th key={`filter-${column.field}`} className="px-6 py-2">
                  <input
                    type="text"
                    placeholder={`Filtrar ${column.headerName.toLowerCase()}...`}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters[column.field] || ''}
                    onChange={(e) => handleFilterChange(column.field, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
              >
                {columns.map((column) => (
                  <td key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.valueFormatter 
                      ? column.valueFormatter({ value: row[column.field] })
                      : row[column.field]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-b-lg">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onPaginationModelChange?.({ 
              ...paginationModel, 
              page: Math.max(0, paginationModel.page - 1) 
            })}
            disabled={paginationModel.page === 0}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => onPaginationModelChange?.({ 
              ...paginationModel, 
              page: Math.min(totalPages - 1, paginationModel.page + 1) 
            })}
            disabled={paginationModel.page >= totalPages - 1}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
        
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{paginationModel.page * paginationModel.pageSize + 1}</span> a{' '}
              <span className="font-medium">
                {Math.min((paginationModel.page + 1) * paginationModel.pageSize, rowCount)}
              </span>{' '}
              de <span className="font-medium">{rowCount}</span> resultados
            </p>
            
            <select
              value={paginationModel.pageSize}
              onChange={(e) => onPaginationModelChange?.({ 
                page: 0, 
                pageSize: parseInt(e.target.value) 
              })}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size} por página</option>
              ))}
            </select>
          </div>
          
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onPaginationModelChange?.({ 
                  ...paginationModel, 
                  page: Math.max(0, paginationModel.page - 1) 
                })}
                disabled={paginationModel.page === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                &#8249;
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = paginationModel.page < 3 ? i : paginationModel.page - 2 + i;
                if (pageNum >= totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPaginationModelChange?.({ ...paginationModel, page: pageNum })}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pageNum === paginationModel.page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              
              <button
                onClick={() => onPaginationModelChange?.({ 
                  ...paginationModel, 
                  page: Math.min(totalPages - 1, paginationModel.page + 1) 
                })}
                disabled={paginationModel.page >= totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                &#8250;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const DatabasePagination = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'department', headerName: 'Departamento', width: 120 },
    { 
      field: 'salary', 
      headerName: 'Salario', 
      width: 120,
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    { field: 'createdAt', headerName: 'Fecha Creación', width: 120 }
  ];

  // Cargar datos cuando cambien los parámetros de paginación, ordenamiento o filtros
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchPaginatedData(
          paginationModel.page,
          paginationModel.pageSize,
          sortModel,
          filterModel
        );
        setData(result.data);
        setTotalCount(result.total);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [paginationModel, sortModel, filterModel]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        StripedDataGrid con Paginación en Base de Datos
      </h1>
      
      <div className="bg-white rounded-lg shadow">
        <StripedDataGrid
          rows={data}
          columns={columns}
          loading={loading}
          paginationMode="server"
          rowCount={totalCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Parámetros actuales:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>Página:</strong> {paginationModel.page + 1}</div>
          <div><strong>Tamaño:</strong> {paginationModel.pageSize}</div>
          <div><strong>Total registros:</strong> {totalCount}</div>
          <div><strong>Ordenamiento:</strong> {sortModel[0] ? `${sortModel[0].field} (${sortModel[0].sort})` : 'Ninguno'}</div>
          <div><strong>Filtros activos:</strong> {filterModel.items?.length || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePagination;