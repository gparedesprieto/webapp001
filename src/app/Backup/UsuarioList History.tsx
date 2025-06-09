"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridRenderCellParams, GridColDef, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { esES } from '@mui/x-data-grid/locales';
import { bgBG as coreBgBG } from '@mui/material/locale';

import { Theme, alpha, styled } from '@mui/material/styles';
import ConfirmModal from '../components/ConfirmModal';
import { appBarClasses } from "@mui/material";

const ODD_OPACITY = 0.2;
const token = "eyJ4NXQiOiJNV1V4WW1Oa1pXSXdZVFEyTkRjeU1UVXdZelUxTlRReVlUbGpZekF5WmpNNU5EZ3haVFZrWkRGbE5tVmhORGt6WXpneVlqQXlNMk5pWlRBellqUTBZdyIsImtpZCI6Ik1XVXhZbU5rWldJd1lUUTJORGN5TVRVd1l6VTFOVFF5WVRsall6QXlaak01TkRneFpUVmtaREZsTm1WaE5Ea3pZemd5WWpBeU0yTmlaVEF6WWpRMFl3X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYWIwYjY2YS1kNDkzLTRmNGItYmQwNS0xZTk5MGUzYzI4NjkiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJuYmYiOjE3NDgzNTk1NzgsImF6cCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc0ODM5NTU3OCwiaWF0IjoxNzQ4MzU5NTc4LCJqdGkiOiI3MTI5Nzg1Zi1hMTQ4LTQ0ZDktYWE5OS0zMjAwYTQwZGQ4M2IiLCJjbGllbnRfaWQiOiJwUldWMnRIYW5JYkZGMUN1R1JPTzhMeU1OVjhhIn0.aMgLHU3JLFhZUP0zLZDUGiK2LJK2QIyd7YOULCWvtdVmYcMyw_tsFlJAPOU5v3CbUKUArw0g-8ulorBzxwRMtcXrKMQ7RF_yi13mO23f89tadau0P8m45CtlrANwq8F4qeorpo3_WAb12dBla4vT7btMAEtlqUMHMaSBT07Sdyp42tB-ZWIGX3T9YGzGF_I5d8TNwAmZQl1BNqiwtOtyVVjLbZf47wZzXsn4wgRMBoQ2My1qQewdNNRdhsMTMceUFbld3o6dFU3jYe0P6zXjpSyOlDmngPCFbc9xt320wsOl9XFX48w8FTjwcOhrnfJogVoiWWlF4nQP06jieXw9bQ";

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

type Usuario = {
  metodo: string;
  codigo: number;
  id: string;
  nombres: string;
  apellidos: string;
  fecha: string;
  email: string;
  sexo: string;
  edad: string[];
  rol: string;
  comentarios: string;
};

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalMessage, setModalMessage] = useState(String);
  const [modalAction, setModalAction] = useState(String);

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
            onClick={() => editarUsuario(params.row)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
          <button
            onClick={() => eliminarUsuario(params.row.codigo)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      ),
      flex: 1,
    }
  ]

  const getConfirmHandler = () => {
    switch (modalAction) {
      case 'DELETE':
        return handleEliminarUsuario;
      case 'APPROVAL':
        return handleAprobarUsuario;
      default:
        return () => console.log('Acción no definida');
    }
  };

  function removeFilterPrefix(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      const newKey = key.startsWith("filter_") ? key.replace(/^filter_/, "") : key;
      result[newKey] = obj[key];
    });

    return result;
  }

  const obtenerUsuarios = async () => {
      try {
        //const res = await fetch("/api/usuarios");
        //const data = await res.json();
        console.log ( "valueFiltro ->" + valueFiltro )
        
        // const json = JSON.parse(valueFiltro);

        const input = {
          payload: null
        };

        let json = null

        if (valueFiltro)
          json = removeFilterPrefix(JSON.parse(valueFiltro));
        else
          json = JSON.parse(JSON.stringify(nullObjetoFilter));

        console.dir(json);

        if (json.id)
          json.codigo = Number(json.id);
        else
          json.codigo = 0;
        delete json.id;
        delete json.metodo;
        input.payload = json;

        console.log( JSON.stringify(input) )


        //const res = await fetch("https://localhost:8243/seguridad/v1/buscarUsuario", {
        //const res = await fetch("https://localhost:8243/seguridad/v1/buscarUsuario1/" + json.id, {
        //const res = await fetch("https://localhost:8243/seguridad/v1/buscarUsuario2/" + json.id + "/" + json.nombres, {
        const res = await fetch("https://localhost:8243/seguridad/v1/UsuarioFiltro", {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
          },
          body: JSON.stringify(input)
        });
        
        const data = await res.json();

        //console.log( data )
        console.log( data.Usuarios.Usuario )

        if (!Array.isArray(data?.Usuarios?.Usuario) || data.Usuarios.Usuario.length === 0) {
          console.log("No hay usuarios");
          setUsuarios([]);
        }
        else {
          setUsuarios(data.Usuarios.Usuario);
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

  const editarUsuario = async (usuario: Usuario) => {
    onSeleccionUsuario(usuario);
  };

  const aprobarUsuario = async () => {
    console.log("aprobarUsuario")
    console.dir(selectedIds);
    

    setModalOpen(true);
    setModalMessage("¿Estás seguro de que deseas aprobar a este(os) usuario?");
    setModalAction ("APPROVAL");
    
  };

  const eliminarUsuario = async (_codigo: string) => {
    /*
    await fetch("/api/usuarios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    */
    setCodigo(_codigo);
    setModalOpen(true);
    setModalMessage("¿Estás seguro de que deseas eliminar este usuario?");
    setModalAction ("DELETE");
  };

  const handleAprobarUsuario = async () => {
    console.log("Acción confirmada.");

    console.log("handleAprobarUsuario: " + codigo);
   
    const allIds = [...selectedIds.ids].join(",");
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

    obtenerUsuarios();
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

    obtenerUsuarios();

    setModalOpen(false);
  };

  useEffect(() => {
    console.log( "FILTRAR:" + valueFiltro )
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
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={getConfirmHandler()}
            title="Usuarios"
            message={isModalMessage}
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
              console.log("ids => ")
              console.dir(ids)
            }}
          />

          
        </ThemeProvider>
        
        }
      </div>

       

    </div>
  );
}
