/**
 * Environment configuration for production readiness
 */

export const config = {
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: parseInt(process.env.API_TIMEOUT) || 10000,
  },
  
  // Supabase Configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPERBASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY,
    serviceRoleKey: process.env.SUPERBASE_SERVICE_ROLE_KEY,
  },
  
  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  // Application Configuration
  app: {
    name: 'Baus Praxis',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: process.env.npm_package_version || '1.0.0',
  },
  
  // Feature Flags
  features: {
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
    enableRealtime: process.env.ENABLE_REALTIME !== 'false',
    enableDebugMode: process.env.ENABLE_DEBUG_MODE === 'true',
  },
};

// Validation function for required environment variables
export function validateEnvironment() {
  const required = {
    'NEXT_PUBLIC_SUPERBASE_URL': config.supabase.url,
    'NEXT_PUBLIC_SUPERBASE_ANON_KEY': config.supabase.anonKey,
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0 && config.isProduction) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}

export default config;