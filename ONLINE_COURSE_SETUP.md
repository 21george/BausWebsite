# Online Course System Setup Guide

## 🎯 Overview

This system provides a complete online course platform with:

- Stripe payment integration
- Supabase storage for course files
- Time-limited download URLs
- Automated email delivery
- Course management

## 📋 Prerequisites

- Stripe account with API keys
- Supabase project
- SMTP email service (Gmail, SendGrid, etc.)
- Node.js and Next.js environment

## 🛠️ Installation Steps

### 1. Database Setup

Run the following SQL files in your Supabase SQL Editor:

1. **Main Schema** (`database/online_courses_schema.sql`)
2. **Functions** (`database/course_functions.sql`)

### 2. Storage Setup

In Supabase Dashboard:

1. Go to **Storage** → **Create Bucket**
2. Name: `course-files`
3. Public: **No** (private bucket)
4. Create the bucket

### 3. Environment Variables

Add these to your `.env.local`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Baus Online-Kurse
EMAIL_TO=admin@baus-praxis.de

# Site Configuration
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Stripe Webhook Setup

1. Go to Stripe Dashboard → **Webhooks**
2. Create endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Add events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 5. Course Content Upload

#### Option A: Manual Upload via Supabase Dashboard

1. Go to **Storage** → `course-files` bucket
2. Create folders for each course (use course ID)
3. Upload videos (MP4) and PDFs
4. Note the file paths

#### Option B: Programmatic Upload

Use the Supabase client to upload files:

```javascript
const { data, error } = await supabase.storage
  .from("course-files")
  .upload(`course-${courseId}/video1.mp4`, file);
```

### 6. Add Sample Courses

Insert test courses into the `online_courses` table:

```sql
INSERT INTO online_courses (title, description, price, duration_hours, level) VALUES
('Yoga Grundlagen', 'Lernen Sie die Grundlagen des Yoga.', 49.99, 5, 'beginner'),
('Physiotherapie Basics', 'Grundlagen der Physiotherapie.', 89.99, 8, 'intermediate');
```

### 7. Link Course Files

Add files to the `course_files` table:

```sql
INSERT INTO course_files (course_id, file_name, file_type, storage_path, file_order) VALUES
('course-uuid', 'Yoga_Intro.mp4', 'video', 'course-uuid/Yoga_Intro.mp4', 1),
('course-uuid', 'Yoga_Guide.pdf', 'pdf', 'course-uuid/Yoga_Guide.pdf', 2);
```

## 🚀 Usage

### For Customers

1. Visit `/OnlineKurse`
2. Select a course
3. Fill in name and email
4. Complete Stripe payment
5. Receive email with download links
6. Access files within 7 days (5 downloads max)

### For Admins

1. Visit `/admin/courses` (optional admin interface)
2. Manage courses and view sales
3. Upload new course content to Supabase Storage

## 📧 Email Templates

The system sends HTML emails with:

- Course details
- Download links
- Expiration warnings
- Professional styling

## 🔒 Security Features

- Time-limited download URLs (1 hour)
- Download count limits (5 per purchase)
- Purchase token validation
- Private file storage
- Stripe webhook verification

## 🏗️ File Structure

```
app/
├── OnlineKurse/page.jsx          # Main course listing
├── course-success/page.jsx       # Payment success page
├── admin/courses/page.jsx        # Admin interface
├── actions/onlinecourses/        # Server actions
└── api/
    ├── create-course-checkout/   # Stripe checkout
    ├── stripe-webhook/           # Payment webhooks
    ├── send-course-email/        # Email service
    ├── download-course/          # Download handler
    └── verify-payment/           # Payment verification

database/
├── online_courses_schema.sql     # Database schema
└── course_functions.sql          # SQL functions
```

## 🔧 Testing

### Test Payment Flow

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Failure: `4000 0000 0000 0002`
2. Check email delivery
3. Verify download functionality
4. Test expiration limits

### Test Download System

1. Complete a test purchase
2. Check email for download links
3. Visit download page
4. Test file downloads
5. Verify download count limits

## 🚨 Troubleshooting

### Common Issues

1. **No email received**: Check SMTP settings and spam folder
2. **Download links not working**: Verify Supabase storage permissions
3. **Payment not processing**: Check Stripe webhook configuration
4. **Files not uploading**: Check storage bucket permissions

### Debug Tips

- Check browser console for JavaScript errors
- Review server logs for API errors
- Verify Stripe webhook deliveries in dashboard
- Test email configuration with `/api/check-email-config`

## 🎨 Customization

### Styling

- Update Tailwind classes in components
- Modify email templates in `/api/send-course-email/route.js`
- Customize course cards in `OnlineKurse/page.jsx`

### Business Logic

- Adjust download limits in database schema
- Modify expiration times in CourseActions.js
- Update pricing display formats

## 📊 Monitoring

- Track purchases in Supabase dashboard
- Monitor webhook deliveries in Stripe
- Review email delivery logs
- Analyze download patterns

## 🔄 Maintenance

- Regularly clean up expired purchases
- Monitor storage usage
- Update security patches
- Backup customer data

---

## 📞 Support

For technical issues or questions:

- Email: support@baus-praxis.de
- Documentation: This README
- Logs: Check browser console and server logs
