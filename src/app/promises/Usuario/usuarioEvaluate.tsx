import { fetchGeneric } from '../../util/fetchGeneric';
import { fetchGenericTest } from '../../util/fetchGenericTest';

const _token = "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5NzRhMDRhZi0yNzBjLTQ0ZjYtYWY3NS1jMTYxOTU0ODBjMDJAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiYmZlNDFkOTAtOTIzYy00NzJmLWI3ZDUtMTNkMTNkYTA3M2FkIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJkYnBnMDAxIC0gRW5kcG9pbnQgODA5MyIsImNvbnRleHQiOiJcL2JmZTQxZDkwLTkyM2MtNDcyZi1iN2Q1LTEzZDEzZGEwNzNhZFwvZGVmYXVsdFwvZGJwZzAwMVwvZW5kcG9pbnQtODA5My1kYzFcL3YxLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6InYxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTc0OTU3NjY3NSwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNzQ5NTc2MDc1LCJqdGkiOiIzOTMxZWFhOS0wMWIwLTQ5MzEtYjkxNi1jYTZhZWZjOWFjZGYifQ.hhi5V92MV18LgoJE409Lm0catrUPz2tZ7-T0FLL3z9NUAEEIXSMzx6PSD-wPwhCeNnrV-05NWfM3K_KawcLZixs1BA5qIkQ9_80ZvaY_0lhiXrUO0Z1zZM0o9hdc-eQUoU8uOA5ZwJqhrl8ehPIEh0ziENtIEAv25NO0II6ri5RjLf5HkPzZUQdNv2gRmtCZXAYyg2gimPFYXq0JGNKvmp5-t0TuW28KVW16dty2sUjY4cuDflqvgea6oChbfC9zLlyFhGHBwTI2kVt3-MHzuqTkQtLBlGhxD7mCuCjmJRJMXhW9chLc7d1_yAqqiYFJHcI1OupZIrYE8ALF2HzxS98ra8VZEzY50XdACrOtBbAD7oOqEfjMa5Fn-a5dia6K0uHou4u0B-1KS_DPW5dKl6OQFt9bds8fDfyHL-sQzGiIeqtOiS0lixjnnlVFfKHOHGi3hOJSp9pFTJAHvG5SnZI3NJiZCL7lFg_K6uxSb4vAOF22S7e9cnfMfLMU8jL0VznVVFDxG_tW8TeaBzD6lx_g-lmG5TsOdNoil9PzFNrWnkdYjUI1NZ__fUyabDTj8JqfMDW-Lj9Yl52jBsfYd-NwjlRYftNhJxUYLwlC6xlKls_OHoXboKY4L8qUe31RYbSk7npqXMXqbrWxOc0Yh6rZmo8Qg4mw3LpZbvwEDcY";

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
