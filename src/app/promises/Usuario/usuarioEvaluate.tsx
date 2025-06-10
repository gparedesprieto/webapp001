import { fetchGeneric } from '../../util/fetchGeneric';
import { fetchGenericTest } from '../../util/fetchGenericTest';

const _token = "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5NzRhMDRhZi0yNzBjLTQ0ZjYtYWY3NS1jMTYxOTU0ODBjMDJAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiYmZlNDFkOTAtOTIzYy00NzJmLWI3ZDUtMTNkMTNkYTA3M2FkIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJkYnBnMDAxIC0gRW5kcG9pbnQgODA5MyIsImNvbnRleHQiOiJcL2JmZTQxZDkwLTkyM2MtNDcyZi1iN2Q1LTEzZDEzZGEwNzNhZFwvZGVmYXVsdFwvZGJwZzAwMVwvZW5kcG9pbnQtODA5My1kYzFcL3YxLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6InYxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTc0OTU4NTA5MSwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNzQ5NTg0NDkxLCJqdGkiOiIyZjM0OTllOS00ODkyLTQ2MjItYWY0OS01ZDYzZTA4MGFmMzgifQ.Pr6rB0yc1EIFP40QpDFlUhhUiU81KIL1cRK3yfwEh-TdCx2hUPJ1PEAXG5xk1DR-PKdWrNhMj-dESua_v8NRvunDXj0x7vZvKLl9KuoUupiuV1HM9IXKrOWCXsYlLdGeeddLjGHi4022RJvGl0LMWUYX2KfQW4vZriTNG69Ep7PfIwLMWOdIXxJjDIwQ8TD2rZQNCWU6JeEWh-rtmOdOhHhlk2YU_LOrHwYRz-wyTCzQ3ulHiYGORJkkfQZbSUqCP7PynVcUDUmBDRCjJ0DGghT-dFpOxu817JMjsXwSYixqDCkY_DtxL92aV62BVkyGj2E89iKpWR5rKnKXkpfFIDm9Z-S5mePMlOdVuZRAxVeTsG10Upt-0qYPSj6zl0B_aqVGxiwZmsMuwj6vEx9xn3wNL_Gxj55jAzBnf0QY6d9Z3rHH0ZMAmWPpyLLCWizyq2KcyZdrTfOzd4EpX2waYKJFE3uJfrcyWSahn4PMb8kbJSk9AJyfsjhCAn84D6z6H42qFR-vjMmR2gMmPjIkAKjg2cUFy3Ybw1cEMu_dh0lq56bWoZiDYz_39zM3mPfPFWCewjLPtxR-5X3UMiex7QMLgsqeYaK-34CnfcAY1g54VeUdwffJRLf7Nq9o8k5scQO-lCtRg4pF6XelyhV0fimxzz2iKDgLjRI5TfnuN7g";

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
