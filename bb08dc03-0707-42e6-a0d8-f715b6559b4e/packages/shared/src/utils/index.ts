// Shared utilities placeholder
// TODO: Add common utility functions

export const formatDate = (date: Date): string => {
  // TODO: Implement date formatting
  return date.toISOString();
};

export const isValidEmail = (email: string): boolean => {
  // TODO: Implement email validation
  return email.includes('@');
};

export const generateId = (): string => {
  // TODO: Implement ID generation
  return Math.random().toString(36).substring(2, 15);
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): T => {
  // TODO: Implement debounce function
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};
