export const getErrorMessage = (
  error: unknown,
  fallbackMessage = 'Ocurrió un error inesperado.',
): string => {
  return error instanceof Error ? error.message : fallbackMessage;
};
