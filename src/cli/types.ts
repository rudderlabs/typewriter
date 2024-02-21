export interface APIError extends Error {
  code: string;
  statusCode: number;
  errno: number;
}
