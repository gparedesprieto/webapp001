import React, { useState, useEffect } from 'react';
import StripedDataGrid from '../components/StripedDataGrid';

import { Usuario } from '../interfaces/Usuario';
import { UsuarioData } from '../services/Usuario/UsuarioData';

type UsuarioDataListProps = {
  triggerReload: boolean;
  valueFiltro: string | null;
  onSeleccionUsuario: (usuario: Usuario) => void;
};

// Componente principal
const UsuarioDataList = ({ triggerReload, valueFiltro, onSeleccionUsuario }: UsuarioDataListProps) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'rol', headerName: 'Rol', width: 200 },
    { field: 'ciudad_descripcion', headerName: 'Ciudad', width: 200 },
    /*
    { 
      field: 'salary', 
      headerName: 'Salario', 
      width: 120,
      hide: true,
      valueFormatter: ({ value }) => `$${value?.toLocaleString()}`
    },
    */
    { field: 'fecha', headerName: 'Fecha', width: 120 }
  ];

  // Cargar datos cuando cambien los parámetros de paginación, ordenamiento o filtros
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await UsuarioData(
          paginationModel.page,
          paginationModel.pageSize,
          sortModel,
          filterModel,
          valueFiltro
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
  }, [paginationModel, sortModel, filterModel, valueFiltro]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        ...
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
          pageSizeOptions={[5, 10, 25, 50, 100]}
          onSeleccionUsuario={onSeleccionUsuario}
          triggerReload={triggerReload}
          valueFiltro={valueFiltro}
        />
      </div>

{
  /*
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
  */
}
      
    </div>
  );
};

export default UsuarioDataList;