export const sanitizeKey = (value: any) =>
  value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^a-zA-Z0-9_]+|^_+|_+$/g, '_')
    .replace(/_+/g, '_');

export const sanitizeEnumKey = (value: string) =>
  value
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_') // Replace non-alphanumeric characters with '_'
    .replace(/_+/g, '_') // Merge consecutive underscores
    .replace(/(^_+)|(_+$)/g, '') // Remove leading/trailing underscores
    .split('_') // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(''); // Join words into PascalCase
