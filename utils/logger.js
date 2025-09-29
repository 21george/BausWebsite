/**
 * Production-ready logging utility
 * Logs only errors in production, all levels in development
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  error: (...args) => {
    console.error(...args);
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  }
};

export default logger;