export function convertirJsonAString(json: Record<string, string>): string {
  return Object.entries(json)
    .map(([key, value]) => {
      const sinPrefijo = key.replace(/^filter_/, '');
      return `${sinPrefijo}=${value}`;
    })
    .join(',');
}
