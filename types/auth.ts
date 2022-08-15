export type RegisterReturnType = { hasError: boolean; message?: string };

export enum AuthProtection {
  notAuthenticatedOnly,
  notAuthenticated,
  authenticated,
  admin,
}
