import { fetchGeneric } from '../util/fetchGeneric';

const _token = "eyJ4NXQiOiJNV1V4WW1Oa1pXSXdZVFEyTkRjeU1UVXdZelUxTlRReVlUbGpZekF5WmpNNU5EZ3haVFZrWkRGbE5tVmhORGt6WXpneVlqQXlNMk5pWlRBellqUTBZdyIsImtpZCI6Ik1XVXhZbU5rWldJd1lUUTJORGN5TVRVd1l6VTFOVFF5WVRsall6QXlaak01TkRneFpUVmtaREZsTm1WaE5Ea3pZemd5WWpBeU0yTmlaVEF6WWpRMFl3X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYWIwYjY2YS1kNDkzLTRmNGItYmQwNS0xZTk5MGUzYzI4NjkiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJuYmYiOjE3NDg0NDg1OTAsImF6cCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc0ODQ4NDU5MCwiaWF0IjoxNzQ4NDQ4NTkwLCJqdGkiOiI5ZThlNmQ0Yi1mYTFmLTRiMmMtYjQ0My04YWU0ZjY2NDE4MjUiLCJjbGllbnRfaWQiOiJwUldWMnRIYW5JYkZGMUN1R1JPTzhMeU1OVjhhIn0.l5DrJWYSBmoHU7-Q1xoLdfrDQGWrYpsj48Pwl2yrfjCW64jlURpTf4tX9-aaS6W6Qd-ynhbFxGGqOkgB-w-17c0mAioJfSozdjIJrwEwghwqulNrxNQoeGUAJLJb55uPdiIVfND4oCg_c8-Cx5hS-5gVd5vk1OYR_RSYh87kKGDRvcTFzj9wcSY78pm_ggR6hxj5NBE58oWDfD61RcQd9ShNS2vwESsUIFNU_0kQKiy7LIhEqmFdcsjhim9s-2k17isv1U4D1GJm91DG1OOl9zcTGM5-pIJvT8F98Hdzw3o5moUuoif-EMbYqT3Pn6vfK_beYcUWkxKII_FwqWqavw";

export const evaluarUsuario = async (data: any) => {
  const result = await fetchGeneric({
    url: 'https://localhost:8243/seguridad/v1/Usuario',
    method: 'PATCH',
    input: data,
    token: _token
  });

  console.log('Resultado:', result);
};

export const eliminarUsuario = async (data: any) => {
  const result = await fetchGeneric({
    url: 'https://localhost:8243/seguridad/v1/Usuario',
    method: 'DELETE',
    input: data,
    token: _token
  });

  console.log('Resultado:', result);
};