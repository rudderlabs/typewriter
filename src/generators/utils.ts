export const sanitizeKey = (value: any) =>
  value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^a-zA-Z0-9_]+|^_+|_+$/g, '_')
    .replace(/_+/g, '_');
