"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridRenderCellParams, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { esES } from '@mui/x-data-grid/locales';
import { bgBG as coreBgBG } from '@mui/material/locale';

import { Theme, alpha, styled } from '@mui/material/styles';
import ConfirmModal from '../../components/ConfirmModal';
import { removeFilterPrefix} from '../../functions/removeFilterPrefix';
//import { appBarClasses } from "@mui/material";
import { Usuario } from '../../interfaces/Usuario';

const ODD_OPACITY = 0.2;

import { listarUsuario, evaluarUsuario, eliminarUsuario } from '../../promises/Usuario/usuarioEvaluate';

function customCheckbox(theme: Theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: '1px solid #d9d9d9',
      borderRadius: 2,
      ...theme.applyStyles('dark', {
        borderColor: 'rgb(67, 67, 67)',
      }),
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
    ...customCheckbox(theme),
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES, // x-data-grid translations
  coreBgBG, // core translations
);

type UsuariosListProps = {
  triggerReload: boolean;
  valueFiltro: string | null;
  onSeleccionUsuario: (usuario: Usuario) => void;
};

export default function UsuariosList({ triggerReload, valueFiltro, onSeleccionUsuario }: UsuariosListProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  })
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

  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    ciudad: false,
    ciudad_descripcion: false,
    nombres: true,
    apellidos: false,
    email: false,
    sexo: false,
    fecha: false,
    edad: false,
    lugar: false,
    rol: false,
    comentario: false,
    acciones: true
  });

  const nullObjeto: Usuario = {
          metodo: "POST",
          codigo: 0
        }

  const nullObjetoFilter: Usuario = {
          metodo: "POST",
          codigo: 0,
          nombres: "",
          apellidos: "",
          fecha: "",
        }  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'ciudad', headerName: 'Ciudad', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'ciudad_descripcion', headerName: 'Ciudad Desc', headerClassName: 'super-app-theme--header', flex: 1, hide: true },
    { field: 'nombres', headerName: 'Nombres', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'apellidos', headerName: 'Apellidos', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'email', headerName: 'Email', headerClassName: 'super-app-theme--header', flex: 1, hide: true },
    { field: 'sexo', headerName: 'Sexo', headerClassName: 'super-app-theme--header', width: 100, flex: 1, hide: true },
    { field: 'fecha', headerName: 'Fecha', headerClassName: 'super-app-theme--header', width: 100, flex: 1 },
    {
      field: 'edad',
      headerName: 'Edad',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const edadOpciones = params.row.edad;
        if (!edadOpciones || edadOpciones.length === 0) return '-';
        
        return (
          <div>
            {Array.isArray(edadOpciones) 
              ? edadOpciones.join(', ')
              : edadOpciones}
          </div>
        );
      }
    },
    { field: 'lugar', headerName: 'Lugar', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'rol', headerName: 'Rol', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'comentario', headerName: 'Comentario', headerClassName: 'super-app-theme--header', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => accionEditarUsuario(params.row)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
          <button
            onClick={() => accionEliminarUsuario(params.row.codigo)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      ),
      flex: 1,
    }
  ]

  const obtenerUsuarios = async () => {
      try {
        //console.log ( "valueFiltro ->" + valueFiltro )
        
        // const json = JSON.parse(valueFiltro);

        const input = {
          payload: null
        };

        let json = null

        if (valueFiltro)
          json = removeFilterPrefix(JSON.parse(valueFiltro));
        else
          json = JSON.parse(JSON.stringify(nullObjetoFilter));

        //console.dir(json);

        if (json.id)
          json.codigo = Number(json.id);
        else
          json.codigo = 0;
        delete json.id;
        delete json.metodo;
        input.payload = json;

        //console.log( JSON.stringify(input) )

        const res = await listarUsuario(input)

        console.dir(res);

        if (!Array.isArray(res) || res.length === 0) {
          console.log("No hay usuarios");
          setUsuarios([]);
        }
        else {
          console.log("SI hay usuarios");
          setUsuarios(res);
        } 

      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setCargando(false);
      }
    };
  
  const  nuevoUsuario = async (usuario: Usuario) => {
    onSeleccionUsuario(usuario);
  };

  const accionEditarUsuario = async (usuario: Usuario) => {
    onSeleccionUsuario(usuario);
  };

  const aprobarUsuario = async () => {
    //console.log("aprobarUsuario")
    //console.dir(selectedIds);
    
    openModal('Aprobar usuarios', 'APPROVAL', '¿Estás seguro de que deseas aprobar a este(os) usuario?');
  };

  const accionEliminarUsuario = async (_codigo: string) => {
    setCodigo(_codigo);
    openModal('Eliminar usuarios', 'DELETE', '¿Está seguro de eliminar este usuario?');
  };

  const handleAprobarUsuario = async () => {
    //console.log("handleAprobarUsuario: " + codigo);
   
    const allIds = [...selectedIds.ids].join(",");
    //console.log(allIds);
    
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigos = allIds;
    json.accion = "A";
    json.usuarioAudit = "ccccccc";
    input.payload = json;
    
    evaluarUsuario(input, obtenerUsuarios);

  };

  const handleEliminarUsuario = async () => {
    //console.log("eliminarUsuario: " + codigo);
   
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigo = Number(codigo);
    json.usuarioAudit = "eeeeeeee";
    input.payload = json;
    
    eliminarUsuario(input, obtenerUsuarios);

    closeModal();
  };

  useEffect(() => {
    //console.log( "FILTRAR:" + valueFiltro )
    obtenerUsuarios();
  }, [triggerReload, valueFiltro]);

  if (cargando) return <p className="text-center">Cargando usuarios...</p>;

  if (usuarios.length === 0) return <p className="text-center">No hay usuarios registrados.</p>;

  {
    /*
    max-w-4xl mx-auto p-4

    */
  }

  return (
    <div className="w-full">
      {/*
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      */}
      <h2 className="text-xl font-bold mb-4">.</h2>
      
        <div>Filtro| : {valueFiltro}</div>

      <div style={{ height: 500, width: '100%' }}>
        {
          
        <ThemeProvider theme={theme}>

          <h1 className="text-2xl font-bold text-center">.</h1>

          <button
            onClick={() => nuevoUsuario(nullObjeto)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Nuevo
          </button>
          &nbsp;&nbsp;
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

          <StripedDataGrid
            loading={false}
            columns={columns}
            rows={usuarios}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[1, 2, 5, 10, 20]}

            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}

            checkboxSelection
            autoHeight

            onRowSelectionModelChange={(ids) => {
              setSelectedIds(ids);
              //console.log("ids => ")
              //console.dir(ids)
            }}
          />

          
        </ThemeProvider>
        
        }
      </div>

       

    </div>
  );
}
