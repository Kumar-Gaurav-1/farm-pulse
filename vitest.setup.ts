import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Supress console.error in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Diagnosis error:')
  ) {
    return;
  }
  originalConsoleError(...args);
};
