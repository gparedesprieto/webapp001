import { fetchGeneric } from '../../util/fetchGeneric';
import { fetchGenericTest } from '../../util/fetchGenericTest';

const _token = "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5NzRhMDRhZi0yNzBjLTQ0ZjYtYWY3NS1jMTYxOTU0ODBjMDJAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiYmZlNDFkOTAtOTIzYy00NzJmLWI3ZDUtMTNkMTNkYTA3M2FkIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJkYnBnMDAxIC0gRW5kcG9pbnQgODA5MyIsImNvbnRleHQiOiJcL2JmZTQxZDkwLTkyM2MtNDcyZi1iN2Q1LTEzZDEzZGEwNzNhZFwvZGVmYXVsdFwvZGJwZzAwMVwvZW5kcG9pbnQtODA5My1kYzFcL3YxLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6InYxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTc0OTU3NzM1NywidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNzQ5NTc2NzU3LCJqdGkiOiJmZmE1Y2FhMy05NTA5LTQ1NzAtODIxYi1lOTNiZjE4ODBkZmIifQ.J0ugNZ1WfXIR5TX_rq_a_Owm2N_uYoeSEVE1jHK5DWIevhdgBCBs5C0pPM3u9CG96hQJMhd1-udBE5A5h1R8UQPtP1RPykH7hXIAjYUX2ekI7ss-HJ3d8CCIhntNtbo3QEAEaFmozx9pWiH0T3V0waofOurEFf9vwtrwc8QwUB_fUT6sCOG9Jxm7FoE6cwnAjZBXFjZByu4c63b8cVzrtx0EIMaJ1PbeG567hIqAIt6e3UYLZw1C5tSYAk1TbgUx1ShZ0NBRPjJKIL9TzeIG8ikaQhbcQ85pbe01pcffyRqeNFcOoq0Mz8XzqePmx7tRzEX04KnX4d0RTkLN_zpJ7zWP8eL4xM2lFsI7lPJgkXy-ah1uedKtSA2l45Tan41Moy5DG7zDnE3gdaT_PgLL6zdUporo3LligZlkww180djmYU-JmQTWxQ_Smi0tkr6TJ7iw6H5CI0_9QhYVop5FxiMWAicEHVBqeRyQVXvIHlaGbyStqSA8lMRaud7bdQmY4Q3WAqfMyWuSHBHhPJqxYwjTOixIdKSMzuxrJ_pmr8i2zUD_e8qjBQDEGP5r13A_GROWiV3pNQAVKgdmAu1-jibH4WaAnuuLwWzcgnxTNYozVN3lPz6Qian54SjXbTjE_D47fMfCUWOnuml1cmz0YTDMIFa99THPny2kHGibiJw";

export const guardarUsuario = async (metodo: string, data: any) => {
  const result = await fetchGenericTest({
    //url: 'https://localhost:8243/seguridad/v1/Usuario',
    url: 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreoapis.dev/default/dbpg001/endpoint-8093-dc1/v1.0/guardarUsuario',
    method: metodo,
    input: data,
    token: _token
  });

  //console.log('Resultado:', result);
  result.ok = true;
  return result;
};

export const evaluarUsuario = async (data: any, callback?: () => void) => {
  const result = await fetchGenericTest({
    //url: 'https://localhost:8243/seguridad/v1/Usuario',
    url: 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreoapis.dev/default/dbpg001/endpoint-8093-dc1/v1.0/evaluarUsuario',
    method: 'PATCH',
    input: data,
    token: _token
  });

  console.log('Resultado:', result);

  
};

export const eliminarUsuario = async (data: any, callback?: () => void) => {
  const result = await fetchGenericTest({
    //url: 'https://localhost:8243/seguridad/v1/Usuario',
    url: 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreoapis.dev/default/dbpg001/endpoint-8093-dc1/v1.0/eliminarUsuario',
    method: 'DELETE',
    input: data,
    token: _token
  });

  console.log('Resultado:', result);

  if (callback) {
    callback();
  }
};

export const listarUsuarioPagina = async (data: any) => {
  const result = await fetchGenericTest({
    //url: 'https://localhost:8243/seguridad/v1/UsuarioPaginaFiltro',
    url: 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreoapis.dev/default/dbpg001/endpoint-8093-dc1/v1.0/UsuarioPaginaFiltro',
    method: 'POST',
    input: data,
    token: _token
  });

  //console.log('Resultado:', result);
  return result;//.Usuarios.Usuario;
};

export const listarUsuario = async (data: any) => {
  const result = await fetchGenericTest({
    // "https://localhost:8243/seguridad/v1/buscarUsuario", {
    // "https://localhost:8243/seguridad/v1/buscarUsuario1/" + json.id, {
    //url: 'https://localhost:8243/seguridad/v1/UsuarioFiltro',
    url: 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreoapis.dev/default/dbpg001/endpoint-8093-dc1/v1.0/UsuarioPaginaFiltro',
    method: 'POST',
    input: data,
    token: _token
  });

  //console.log('Resultado:', result);
  return result;//.Usuarios.Usuario;
};
