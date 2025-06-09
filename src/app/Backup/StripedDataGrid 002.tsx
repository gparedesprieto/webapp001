import React, { useState, useEffect } from "react";
import ConfirmModal from '../components/ConfirmModal';

const token = "eyJ4NXQiOiJNV1V4WW1Oa1pXSXdZVFEyTkRjeU1UVXdZelUxTlRReVlUbGpZekF5WmpNNU5EZ3haVFZrWkRGbE5tVmhORGt6WXpneVlqQXlNMk5pWlRBellqUTBZdyIsImtpZCI6Ik1XVXhZbU5rWldJd1lUUTJORGN5TVRVd1l6VTFOVFF5WVRsall6QXlaak01TkRneFpUVmtaREZsTm1WaE5Ea3pZemd5WWpBeU0yTmlaVEF6WWpRMFl3X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYWIwYjY2YS1kNDkzLTRmNGItYmQwNS0xZTk5MGUzYzI4NjkiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJuYmYiOjE3NDg0NDg1OTAsImF6cCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc0ODQ4NDU5MCwiaWF0IjoxNzQ4NDQ4NTkwLCJqdGkiOiI5ZThlNmQ0Yi1mYTFmLTRiMmMtYjQ0My04YWU0ZjY2NDE4MjUiLCJjbGllbnRfaWQiOiJwUldWMnRIYW5JYkZGMUN1R1JPTzhMeU1OVjhhIn0.l5DrJWYSBmoHU7-Q1xoLdfrDQGWrYpsj48Pwl2yrfjCW64jlURpTf4tX9-aaS6W6Qd-ynhbFxGGqOkgB-w-17c0mAioJfSozdjIJrwEwghwqulNrxNQoeGUAJLJb55uPdiIVfND4oCg_c8-Cx5hS-5gVd5vk1OYR_RSYh87kKGDRvcTFzj9wcSY78pm_ggR6hxj5NBE58oWDfD61RcQd9ShNS2vwESsUIFNU_0kQKiy7LIhEqmFdcsjhim9s-2k17isv1U4D1GJm91DG1OOl9zcTGM5-pIJvT8F98Hdzw3o5moUuoif-EMbYqT3Pn6vfK_beYcUWkxKII_FwqWqavw";

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
  valueFiltro

  }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filters, setFilters] = useState({});
  
  const [selectedRows, setSelectedRows] = useState([]);

  const isAllSelected = rows.length > 0 && selectedRows.length === rows.length;

  const [codigo, setCodigo] = useState(String);

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    action: '',
    message: ''
  });

  // Funciones helper para manejar el estado
  const openModal = (title, action, message) => {
    setModalState({
      isOpen: true,
      title,
      action,
      message
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: '',
      action: '',
      message: ''
    });
  };

  const editarUsuario = async (usuario: Usuario) => {
    //console.log("editarUsuario.")
    console.dir(usuario)
    onSeleccionUsuario(usuario);
  };

  const aprobarUsuario = async () => {
    //console.log("aprobarUsuario")
    console.dir(selectedRows);
    
    openModal('Aprobar usuarios', 'APPROVAL', '¿Estás seguro de que deseas aprobar a este(os) usuario?');
  };

  const handleAprobarUsuario = async () => {
    console.log("Acción confirmada.");

    //console.log("handleAprobarUsuario: " + codigo);
   
    const allIds = [...selectedRows].join(",");
    console.log(allIds);
    
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigos = allIds;
    json.usuarioAudit = "Adminx123";
    input.payload = json;
    
    await fetch("https://localhost:8243/seguridad/v1/Usuario", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        //"Accept": "application/json",
        "Authorization":"Bearer " + token
      },
      body: JSON.stringify(input)
    });

    onPaginationModelChange?.({ ...paginationModel, page: 0 })
  };

  const eliminarUsuario = async (_codigo: string) => {
    console.dir(_codigo)
    /*
    await fetch("/api/usuarios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    */
    setCodigo(_codigo);
    openModal('Eliminar usuarios', 'DELETE', '¿Está seguro de eliminar este usuario?');
  };

  const handleEliminarUsuario = async () => {
    console.log("Acción confirmada.");

    console.log("eliminarUsuario: " + codigo);
   
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigo = Number(codigo);
    json.usuarioAudit = "Adminx123";
    input.payload = json;
    
    await fetch("https://localhost:8243/seguridad/v1/Usuario", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //"Accept": "application/json",
        "Authorization":"Bearer " + token
      },
      body: JSON.stringify(input)
    });

    onPaginationModelChange?.({ ...paginationModel, page: 0 })
    
    closeModal();
  };


  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map(row => row.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
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
    onPaginationModelChange?.({ ...paginationModel, page: 0 })
  }, [triggerReload, valueFiltro]);

  return (
    <div className="w-full">

      <button
        onClick={() => aprobarUsuario()}
        className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
      >
        Aprobar
      </button>

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (modalState.action === 'DELETE') {
            handleEliminarUsuario();
          } else if (modalState.action === 'APPROVAL') {
            handleAprobarUsuario();
          }
          closeModal();
        }}
        title={modalState.title}
        message={modalState.message}
      />

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
              {columns.map((column) => (
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
              ))}
                <th rowSpan={2}>
                  Acciones
                </th>
            </tr>
            <tr className="bg-gray-25">
                <th>
                  &nbsp;
                </th>
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
                      {column.valueFormatter 
                        ? column.valueFormatter({ value: row[column.field] })
                        : row[column.field]
                      }
                    </td>
                  ))}
                  <td>
                    <button
                      onClick={() => editarUsuario(row)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(row['id'])}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
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