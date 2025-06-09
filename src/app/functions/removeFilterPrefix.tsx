export function removeFilterPrefix(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      const newKey = key.startsWith("filter_") ? key.replace(/^filter_/, "") : key;
      result[newKey] = obj[key];
    });

    return result;
  }