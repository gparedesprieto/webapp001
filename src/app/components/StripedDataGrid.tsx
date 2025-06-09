import React, { useState, useEffect } from "react";

// Para refrescar datos:
//    onPaginationModelChange?.({ ...paginationModel, page: 0 })

const StripedDataGrid: React.FC = ({ 
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
  pageSizeOptions,
  onSeleccionUsuario,
  triggerReload,
  valueFiltro,
  onSetSelectedRows
  }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filters, setFilters] = useState({});
  
  const [selectedRows, setSelectedRows] = useState([]);

  const isAllSelected = rows.length > 0 && selectedRows.length === rows.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      onSetSelectedRows([]);
    } else {
      setSelectedRows(rows.map(row => row.id));
      onSetSelectedRows(rows.map(row => row.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
    onSetSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

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

  const totalPages = Math.ceil(rowCount / paginationModel.pageSize);4

  useEffect(() => {
    //console.log( "Refrescar:" )
    setSelectedRows([]);
    onSetSelectedRows([]);
    onPaginationModelChange?.({ ...paginationModel, page: 0 })
  }, [triggerReload, valueFiltro]);

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
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </th>
              {columns.map((column) => {
                if (column.headerName === 'Acciones') {
                  return (
                    <th
                      key={column.field}
                      rowSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider bg-gray-50"
                    >
                      {column.headerName}
                    </th>
                  );
                }

                return (
                  <th
                    key={column.field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
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
                );
              })}
            </tr>
            <tr className="bg-gray-25">
                <th>
                  &nbsp;
                </th>
                {columns.map((column) => {
                  if (column.headerName === 'Acciones') {
                    return (
                      <div></div>
                    );
                  }
                  return (
                    <th key={`filter-${column.field}`} className="px-6 py-2">
                      <input
                        type="text"
                        placeholder={`Filtrar ${column.headerName.toLowerCase()}...`}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters[column.field] || ''}
                        onChange={(e) => handleFilterChange(column.field, e.target.value)}
                      />
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, index) => {
              const isSelected = selectedRows.includes(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => handleSelectRow(row.id)}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-100' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onClick={(e) => e.stopPropagation()} // evita propagación
                      onChange={() => handleSelectRow(row.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.field === 'acciones'
                        ? column.renderCell(row)
                        : column.valueFormatter
                          ? column.valueFormatter({ value: row[column.field] })
                          : row[column.field]}
                    </td>
                  ))}
                </tr>
              );
            })}
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

export default StripedDataGrid;