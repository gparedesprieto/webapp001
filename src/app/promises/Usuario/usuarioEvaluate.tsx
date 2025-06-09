import { fetchGeneric } from '../../util/fetchGeneric';
import { fetchGenericTest } from '../../util/fetchGenericTest';

const _token = "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5NzRhMDRhZi0yNzBjLTQ0ZjYtYWY3NS1jMTYxOTU0ODBjMDJAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiYmZlNDFkOTAtOTIzYy00NzJmLWI3ZDUtMTNkMTNkYTA3M2FkIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJkYnBnMDAxIC0gRW5kcG9pbnQgODA5MyIsImNvbnRleHQiOiJcL2JmZTQxZDkwLTkyM2MtNDcyZi1iN2Q1LTEzZDEzZGEwNzNhZFwvZGVmYXVsdFwvZGJwZzAwMVwvZW5kcG9pbnQtODA5My1kYzFcL3YxLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6InYxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTc0OTUxMDkxMCwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNzQ5NTEwMzEwLCJqdGkiOiIyZTY2MDkzMS05MmUzLTRjYjQtYTYyYy0yNGQzN2VmMjBiZDYifQ.MrypSKzUzaPvOeR2rb2ZbJsO-TqY8-fRcbvgYZ6OXIc4-XJWZ8SMWk5ctvsKsI6432VHtrBUhqly5K6vCOnmtaHjCsw6IHzXM8cjnUBKBgVWxuZs9bR3_U2yADJ7_3_-YPr0R2OzYOCeLBelavuJ5eT4q4sEozBC9QIWSCEOnHkfmq7hKKEUMFl2DXNg26gz6JWJDt7v8QeGZYTngv0uwNFbJqGypCPHV-XQ-kUNLiPqk3q_mzA32A9qLi29e-G5eFALfzxsMSAK222Yn8ePqgRgXVWijUaQqVLKWb6f-Q48BcZllcFn4Nc-ElCSvI2yM1isvnG8v_mEwLXydp-5Pt4seReDpdnIZVjFkRyPwb-sfMGSrPpID08-DNS_O10Z8m1GK7NSIxhu2uGITDCuLVQgpnDYxdd5lQGe_LDIjo-pbWKF7RoraYpNmTyI4KMKnJ4QCT0k_IfVoJPSukXbPHHT-iNWkasuxfXv1CnTjfW2UJf_6dF-kYT1Qjwxd5ghSZtIE0qm3psKgfNA5jVgti-nDrMhb-1f9g_8qtFu3ZNNU0RqcOhhOLOkiiN0_JeaHp_WD6TuVfb0XNWtB0IxqmTEe84iIpL-DrkIjNR-sftxmNMnw8H46ZxWAfwtgvQ6B_sVmXteeMostzDOt0tPjE6xfSkJHI1yEv1z38QhqaE";

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
