import React, { useState, useEffect } from 'react';
import StripedDataGrid from '../../components/StripedDataGrid';
import ConfirmModal from '../../components/ConfirmModal';

import { Usuario } from '../../interfaces/Usuario';
import { UsuarioData } from '../../services/Usuario/UsuarioData';
import { evaluarUsuario, eliminarUsuario } from '../../promises/Usuario/usuarioEvaluate';

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

  const [recargar, setRecargar] = useState(false);

  const [id, setId] = useState(String);
  const [action, setAction] = useState(String);

  const [selectedRows, setSelectedRows] = useState([]);

  // Funciones helper para modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    action: '',
    message: ''
  });

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
    { field: 'fecha', headerName: 'Fecha', width: 120 },
    
    {
      field: 'acciones',
      headerName: 'Acciones',
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => actionEditarUsuario(params)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
          <button
            onClick={() => actionAprobarUsuario(params.id)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Aprobar
          </button>
          <button
            onClick={() => actionEliminarUsuario(params.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  function actionEvaluar(action: any){
    setAction(action) 
    openModal('Aprobar usuarios', 'EVALUATE_MASIVE', '¿Estás seguro de que deseas evaluar a este(os) usuario?')
  }

  function actionEditarUsuario(Usuario: any){
    console.dir(id)
    console.log("actionEditarUsuario 2026:" + id)
    onSeleccionUsuario(Usuario);
  }

  function actionAprobarUsuario(id: any){
    console.dir(id)
    console.log("actionEditarUsuario 2026:" + id)
    setId(id)
    openModal('Aprobar usuarios', 'APPROVAL', '¿Estás seguro de que deseas aprobar a este usuario?')
  }

  function actionEliminarUsuario(id: any){
    console.dir(id)
    console.log("actionEliminarUsuario 2026:" + id)
    setId(id)
    openModal('Eliminar usuarios', 'DELETE', '¿Está seguro de eliminar este usuario?');
  }

  function refrescarData(){
    setRecargar(recargar => !recargar)
    closeModal();
    setSelectedRows([])
  } 

  const handleAprobarUsuario = async () => {
    console.log("handleAprobarUsuario: " + id);
   
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigos = id;
    json.accion = "A";
    json.usuarioAudit = "sssssssssss";
    input.payload = json;
    
    evaluarUsuario(input, refrescarData);
    
    closeModal();
  };

  const handleEliminarUsuario = async () => {
    console.log("Acción confirmada.");

    console.log("eliminarUsuario: " + id);
   
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    //json.codigo = Number(id);
    json.codigo = id.toString();
    json.usuarioAudit = "xxxxxx";
    input.payload = json;
    
    eliminarUsuario(input, refrescarData);
    
  };
  
  const handleEvaluarUsuarios = async () => {
    console.dir(selectedRows);
    console.log("handleEvaluarUsuarios...");
   
    const allIds = [...selectedRows].join(",");
    console.log(allIds);

    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigos = allIds;
    json.accion = action;
    json.usuarioAudit = "bbbbbbb";
    input.payload = json;
    
    evaluarUsuario(input, refrescarData);
  };

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

        console.dir(result);

        setData(result.data);
        setTotalCount(result.total);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [paginationModel, sortModel, filterModel, valueFiltro, recargar]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        ...
      </h1>

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (modalState.action === 'DELETE') {
            handleEliminarUsuario();
          } else if (modalState.action === 'APPROVAL') {
            handleAprobarUsuario();
          } else if (modalState.action === 'EVALUATE_MASIVE') {
            handleEvaluarUsuarios();
          }
          closeModal();
        }}
        title={modalState.title}
        message={modalState.message}
      />

      <button
        onClick={() => actionEditarUsuario(null)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Nuevo
      </button>
      <button
        onClick={() => actionEvaluar('A')}
        className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
      >
        Aprobar
      </button>
      <button
        onClick={() => actionEvaluar('R')}
        className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
      >
        Rechazar
      </button>

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
          onSetSelectedRows={setSelectedRows}
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