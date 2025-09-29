/**
 * Performance monitoring utilities for production
 */
import { logger } from './logger';

export class PerformanceMonitor {
  static measurements = new Map();

  static startMeasurement(name) {
    if (typeof window === 'undefined') return;
    
    this.measurements.set(name, performance.now());
  }

  static endMeasurement(name) {
    if (typeof window === 'undefined') return;
    
    const startTime = this.measurements.get(name);
    if (!startTime) return;

    const duration = performance.now() - startTime;
    this.measurements.delete(name);

    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && duration > 1000) {
      logger.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static measureAsync(name, asyncFn) {
    return async (...args) => {
      this.startMeasurement(name);
      try {
        const result = await asyncFn(...args);
        const duration = this.endMeasurement(name);
        
        if (process.env.NODE_ENV === 'development') {
          logger.debug(`${name} completed in ${duration?.toFixed(2)}ms`);
        }
        
        return result;
      } catch (error) {
        this.endMeasurement(name);
        throw error;
      }
    };
  }

  static reportWebVitals(metric) {
    if (process.env.NODE_ENV === 'development') {
      logger.info('Web Vital:', metric);
    }

    // In production, you could send this to an analytics service
    if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ANALYTICS === 'true') {
      // Example: Send to analytics service
      // analytics.track('web-vital', metric);
    }
  }
}

// React hook for measuring component render times
export function usePerformanceLog(componentName) {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      if (duration > 16) { // More than one frame (16ms)
        logger.warn(`${componentName} render took ${duration.toFixed(2)}ms`);
      }
    };
  }
  
  return () => {};
}

export default PerformanceMonitor;