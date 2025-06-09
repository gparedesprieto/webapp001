// src/utils/fetchGeneric.ts
export interface FetchOptions {
  url: string;
  method?: string; // default: "GET"
  input?: any;
  token?: string;
  headers?: Record<string, string>;
}

export const fetchGenericTest = async ({
  url,
  method = 'GET',
  input,
  token,
  headers = {},
}: FetchOptions): Promise<any> => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      ...(token && { "Test-Key": `${token}` }),
      ...headers,
    },
    body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
