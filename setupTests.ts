// src/setupTests.ts
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder and TextDecoder which are not available in jsdom
// This is required for libraries like react-router-dom v6+
Object.assign(global, { TextEncoder, TextDecoder });

// Polyfill for window.matchMedia for react-slick/enquire.js compatibility in Jest
if (!window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {}, // deprecated
      removeListener: function () {}, // deprecated
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; }
    };
  };
}

import '@testing-library/jest-dom';