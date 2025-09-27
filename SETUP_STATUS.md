# 🚀 Quick Setup Guide for Online Course System

## Current Status: APIs Fixed! ✅

The "Server returned non-JSON response" error has been resolved by:

1. ✅ **Fixed Stripe initialization** - Now handles missing environment variables gracefully
2. ✅ **Added proper error handling** - All APIs now return JSON responses
3. ✅ **Created environment checker** - Available at `/api/env-check`

## 🔧 Next Steps to Complete Setup:

### 1. **Environment Variables** (Required)

Create a `.env.local` file in the root directory with:

```env
# Supabase (Required for database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Required for sending download links)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=admin@your-domain.com

# Site URL
NEXT_PUBLIC_URL=http://localhost:3001
```

### 2. **Database Setup** (Required)

Run these SQL files in your Supabase SQL Editor:

- `database/online_courses_schema.sql`
- `database/course_functions.sql`

### 3. **Test the System**

Once environment variables are set:

1. **Visit `/api/env-check`** - Check which variables are missing
2. **Visit `/debug-courses`** - Run system tests
3. **Visit `/OnlineKurse`** - View the course listing page

### 4. **Test Endpoints**

- ✅ `/api/test-course-api` - Basic API test
- ✅ `/api/env-check` - Environment variable check
- ⚠️ `/api/create-course-checkout` - Will work once Stripe is configured
- ⚠️ `/OnlineKurse` - Will work once database is set up

## 🎯 Quick Start (Minimal Setup)

If you want to test the system immediately:

1. **Set up Supabase** (free tier):

   - Go to supabase.com
   - Create project
   - Get URL and anon key
   - Add to `.env.local`

2. **Run the database SQL**:

   - Copy content from `database/online_courses_schema.sql`
   - Paste in Supabase SQL Editor
   - Execute

3. **Test**:
   - Restart server: `npm run dev`
   - Visit `/OnlineKurse`
   - Should see "No courses available" (which is correct!)

## 🔍 Troubleshooting

### "Server returned non-JSON response"

- ✅ **Fixed!** - All APIs now return proper JSON

### "Module not found"

- ✅ **Fixed!** - Import paths corrected

### "Neither apiKey nor config.authenticator provided"

- ✅ **Fixed!** - Stripe initialization now handles missing keys

### Still getting errors?

1. Check `/api/env-check` for missing variables
2. Check browser console for client-side errors
3. Check terminal for server-side errors
4. Visit `/debug-courses` for comprehensive tests

## 📧 Current API Status

All APIs are now working and will return proper JSON responses:

- ✅ **GET /api/test-course-api** - Basic functionality test
- ✅ **GET /api/env-check** - Environment variable status
- ✅ **POST /api/create-course-checkout** - Returns proper error if Stripe not configured
- ✅ **POST /api/stripe-webhook** - Ready for Stripe webhooks
- ✅ **POST /api/send-course-email** - Ready for email sending
- ✅ **GET /api/download-course** - Ready for file downloads

The system is now stable and ready for configuration! 🎉
