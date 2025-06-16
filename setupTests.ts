// src/setupTests.ts
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder and TextDecoder which are not available in jsdom
// This is required for libraries like react-router-dom v6+
Object.assign(global, { TextEncoder, TextDecoder });


import '@testing-library/jest-dom';