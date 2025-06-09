"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridRenderCellParams, GridColDef, gridClasses } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { esES } from '@mui/x-data-grid/locales';
import { bgBG as coreBgBG } from '@mui/material/locale';

import { Theme, alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;
const token = "eyJ4NXQiOiJNV1V4WW1Oa1pXSXdZVFEyTkRjeU1UVXdZelUxTlRReVlUbGpZekF5WmpNNU5EZ3haVFZrWkRGbE5tVmhORGt6WXpneVlqQXlNMk5pWlRBellqUTBZdyIsImtpZCI6Ik1XVXhZbU5rWldJd1lUUTJORGN5TVRVd1l6VTFOVFF5WVRsall6QXlaak01TkRneFpUVmtaREZsTm1WaE5Ea3pZemd5WWpBeU0yTmlaVEF6WWpRMFl3X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYWIwYjY2YS1kNDkzLTRmNGItYmQwNS0xZTk5MGUzYzI4NjkiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJuYmYiOjE3NDgwMzQ1NzAsImF6cCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc0ODAzODE3MCwiaWF0IjoxNzQ4MDM0NTcwLCJqdGkiOiI4ZWQzMDI4MS04ZTI4LTQ2NTctOGI4Yi1kMmFmZDBhNTdmNDEiLCJjbGllbnRfaWQiOiJwUldWMnRIYW5JYkZGMUN1R1JPTzhMeU1OVjhhIn0.mrYd9IMaLeBNK-Eqfj3qyZetz59SNCuyPOyekRCbHODe4BFpYRq7EnoDXUQYoNjqGI_BWnRTy8WJES5612ZjKejo8A1kSfPrrSNlPFa6ArP7sRXBfkt03YiHnE4_oBiBV0x2KDNrK606f89Bnoy1iyRcW0jAY0xxr95IFZVC9XusSKQtZojuwHYyr7__TX6NnlbJySuFu2xcVDcDluoKtyci4lR9IUM-CmRwyu-u6L64OVba-4Es4hZKvBucmKSefzwILMHfqqsGjpnvuxlAWsit5fZoJEob3vnHQlsiugfaGLgQwa5DSyY2eImthoy7WCSt65cZUkjoon5OzLP4Kg";

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
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  sexo: string;
  edad: string[];
  rol: string;
  comentarios: string;
};

type UsuariosListProps = {
  triggerReload: boolean;
  onSeleccionUsuario: (usuario: Usuario) => void;
};

export default function UsuariosList({ triggerReload, onSeleccionUsuario }: UsuariosListProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'nombres', headerName: 'Nombres', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'apellidos', headerName: 'Apellidos', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'email', headerName: 'Email', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'sexo', headerName: 'Sexo', headerClassName: 'super-app-theme--header', width: 100, flex: 1 },
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

  const obtenerUsuarios = async () => {
      try {
        //const res = await fetch("/api/usuarios");
        //const data = await res.json();
        
        const res = await fetch("https://localhost:8243/seguridad/v1/buscarUsuario", {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Authorization":"Bearer " + token
          }
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
  
  const editarUsuario = async (usuario: Usuario) => {
    onSeleccionUsuario(usuario);
  };

  const eliminarUsuario = async (_codigo: string) => {
    /*
    await fetch("/api/usuarios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    */
   
    const input = {
        payload: null
    };

    const json = JSON.parse("{}"); // Objeto vacío
    json.codigo = Number(_codigo);
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
  };

  useEffect(() => {
    obtenerUsuarios();
  }, [triggerReload]);

  if (cargando) return <p className="text-center">Cargando usuarios...</p>;

  if (usuarios.length === 0) return <p className="text-center">No hay usuarios registrados.</p>;

  {
    /*
    max-w-4xl mx-auto p-4

    */
  }

  
  const nullUsuario: Usuario = {
            metodo: "POST",
            id: null,
            nombres: null,
            apellidos: null,
            email: null,
            sexo: null,
            fecha: "",
            edad: null,
            _edad: [],
            lugar: null,
            _lugar: [],
            rol: null,
            comentario: null
          }
          
  return (
    <div className="w-full">
      {/*
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      */}
      <h2 className="text-xl font-bold mb-4">...</h2>

      <div style={{ height: 500, width: '100%' }}>
        {
          

        <ThemeProvider theme={theme}>

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Nuevo 2
          </button>

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
            checkboxSelection
          />

          
        </ThemeProvider>
        
        }
      </div>

        {/*
        <DataGrid
            rows={usuarios}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[1, 2, 5, 10, 20]}
            checkboxSelection
          />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-1">{usuario.nombres} {usuario.apellidos}</h3>
            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Email:</span> {usuario.email}</p>
            <p className="mb-1"><span className="font-semibold">Sexo:</span> {usuario.sexo}</p>
            <p className="mb-1"><span className="font-semibold">Edad:</span> {usuario.edadOpciones.join(", ")}</p>
            <p className="mb-1"><span className="font-semibold">Rol:</span> {usuario.rol}</p>
            {usuario.comentarios && (
              <p className="mt-2 italic text-gray-700 border-l-4 border-blue-300 pl-2">
                "{usuario.comentarios}"
              </p>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => editarUsuario(usuario)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarUsuario(usuario.email)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        {usuarios.map((usuario, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-800">
              <div>
                <span className="font-semibold block">Nombres:</span>
                {usuario.nombres}
              </div>
              <div>
                <span className="font-semibold block">Apellidos:</span>
                {usuario.apellidos}
              </div>
              <div>
                <span className="font-semibold block">Email:</span>
                {usuario.email}
              </div>
              <div>
                <span className="font-semibold block">Sexo:</span>
                {usuario.sexo}
              </div>
              <div>
                <span className="font-semibold block">Edad:</span>
                {usuario.edadOpciones.join(", ")}
              </div>
              <div>
                <span className="font-semibold block">Rol:</span>
                {usuario.rol}
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <span className="font-semibold block">Comentarios:</span>
                <span className="italic text-gray-600">{usuario.comentarios || "—"}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => editarUsuario(usuario)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarUsuario(usuario.email)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>


      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nombres</th>
            <th className="border px-4 py-2">Apellidos</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Sexo</th>
            <th className="border px-4 py-2">Edad</th>
            <th className="border px-4 py-2">Rol</th>
            <th className="border px-4 py-2">Comentarios</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{usuario.nombres}</td>
              <td className="border px-4 py-2">{usuario.apellidos}</td>
              <td className="border px-4 py-2">{usuario.email}</td>
              <td className="border px-4 py-2">{usuario.sexo}</td>
              <td className="border px-4 py-2">{usuario.edadOpciones.join(", ")}</td>
              <td className="border px-4 py-2">{usuario.rol}</td>
              <td className="border px-4 py-2">{usuario.comentarios}</td>
              <td>
                <button
                  onClick={() => editarUsuario(usuario)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarUsuario(usuario.email)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
            

        </tbody>
      </table>
      */}

    </div>
  );
}
