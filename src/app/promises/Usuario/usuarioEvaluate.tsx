import { fetchGeneric } from '../../util/fetchGeneric';
import { fetchGenericTest } from '../../util/fetchGenericTest';

const _token = "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5NzRhMDRhZi0yNzBjLTQ0ZjYtYWY3NS1jMTYxOTU0ODBjMDJAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsIm9yZ2FuaXphdGlvbiI6eyJ1dWlkIjoiYmZlNDFkOTAtOTIzYy00NzJmLWI3ZDUtMTNkMTNkYTA3M2FkIn0sImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJkYnBnMDAxIC0gRW5kcG9pbnQgODA5MyIsImNvbnRleHQiOiJcL2JmZTQxZDkwLTkyM2MtNDcyZi1iN2Q1LTEzZDEzZGEwNzNhZFwvZGVmYXVsdFwvZGJwZzAwMVwvZW5kcG9pbnQtODA5My1kYzFcL3YxLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6InYxLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTc0OTU3NTA5OSwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNzQ5NTc0NDk5LCJqdGkiOiI1ZWFkNjVlYi1hYzA5LTRiMjktODJiZi03MWQ2ODhkMGY4YWIifQ.bi25KF4HohWkegHGVFm7k6oaV5dQSEyGoyMAaGEKHeRIUuCOkH6F2cYe0Iz0oZtYvAahvWhowO6c_3uOw1CX9iOdm3UUdp-XC_7RmPkMfIYde-iR9srqaaCxtAB65j_MeNFt1kgMqQRKSpjJoOID034Nu8xEZB8jNL-q2-mrPgH0xpDW00l1fRnhl3m1F6nb13EUzrY8foixstI48srT1qaLg7Hg1jywV89OgIiLQIxmLxBmTrXNrZWiyuuj_kM7w5Ba9YBqyTsYOHCE2iKa0-f09zxTsGJereBDFcCzhwiVJFrmka1vELJHs2AO5Dku3ZSXFMlayCfP9hCWUrxUUP8pGG4bTw84pH0PkB5AKD2tsBfpxTnNkmx5Iwr0-o8CPenl1hpZs1PvNM0Ax8GEPhqHFG7_rT8uv-yHZQq_kNWiFxrar3wEK3gClvqOGsVdZfMbpOcufKyEAxOhrTx57rKB3x3BpIfE1i67oqpntPWSyvh6yBycYQFF7fShyJy-Iv01I_EBxCJ_kWpiJTbKKNeABrjFwTXLHUDOLp3_TCLpjbFJNp_BEAoXHQ1oKp7Tcylfzpc0lxpCN3NLOnh02T_dfhgm7wrvyYqVfLGHed2tRkT_YHzQ-cYddlig4FLP0ri67lvXokty45hzbg8JuESMbE0md-yMXHbrdfyV7NI";

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
