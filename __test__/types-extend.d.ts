import { TestingLibraryMatchers } from '@testing-library/jest-dom/types/matchers';
import { expect } from '@jest/globals';

declare module 'expect' {
  interface Matchers<R = void> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
