# Course Data Management with Supabase

This document explains how to set up and use the Supabase course data management system for the Baus Website.

## Overview

The course data management system allows you to:

- Store course data in Supabase database
- Update course information dynamically
- Track version history of changes
- Restore previous versions
- Real-time updates across the application

## Setup Instructions

### 1. Database Setup

Run the following SQL migrations in your Supabase dashboard:

1. **Create the table and functions** (in order):
   - `/supabase/migrations/001_create_course_data.sql`
   - `/supabase/migrations/002_create_functions.sql`

### 2. Environment Variables

Ensure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPERBASE_URL=your_supabase_url
NEXT_PUBLIC_SUPERBASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

If not already installed, make sure you have the Supabase client:

```bash
npm install @supabase/ssr @supabase/supabase-js
```

## File Structure

```
/utils/
  ├── superbase/
  │   ├── client.js          # Supabase client for browser
  │   └── server.js          # Supabase client for server
  ├── courseDataManager.js   # Main course data management utilities

/hooks/
  └── useCourseData.js       # React hook for course data

/app/
  ├── Kurse/
  │   └── page.jsx           # Updated to use Supabase data
  └── admin/
      └── course-data/
          └── page.jsx       # Admin interface for managing course data

/supabase/
  └── migrations/
      ├── 001_create_course_data.sql     # Database schema
      └── 002_create_functions.sql      # Database functions
```

## Usage

### Frontend Components

Use the `useCourseData` hook in your React components:

```jsx
import { useCourseData } from "../hooks/useCourseData";

export default function MyComponent() {
  const { courseData, loading, error, updateCourseData } = useCourseData({
    realtime: true, // Enable real-time updates
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{courseData.hero.title}</h1>
      {/* Use courseData as needed */}
    </div>
  );
}
```

### Direct API Usage

You can also use the course data manager directly:

```javascript
import { courseDataManager } from "../utils/courseDataManager";

// Get current course data
const courseData = await courseDataManager.getActiveCourseData();

// Update course data
await courseDataManager.updateCourseData({
  hero: { title: "New Title" },
  mainCourse: { title: "Updated Course Title" },
});

// Get version history
const history = await courseDataManager.getCourseDataHistory();

// Restore previous version
await courseDataManager.restoreCourseDataVersion(versionId);
```

### Admin Interface

Access the admin interface at `/admin/course-data` to:

- View current course data
- Edit course information
- View version history
- Restore previous versions

## Database Schema

The `course_data` table includes:

- **Hero Section**: title, image, imageAlt, subtitle
- **Main Course**: title, description, modules (JSON), content (array)
- **Course Info**: section title, highlights (array), start date, schedule (JSON), consultation week
- **Yoga Section**: title, content (array), pricing title, pricing (JSON)
- **Configuration**: buttons (JSON), images (JSON)
- **Online Product**: title, content (array), pricing title
- **Metadata**: created_at, updated_at, is_active, version

## Available Functions

### Database Functions

1. **`get_active_course_data()`** - Returns the current active course data
2. **`update_course_data(...)`** - Creates a new version with updated data
3. **`get_course_data_history()`** - Returns all versions
4. **`restore_course_data_version(version_id)`** - Restores a previous version

### JavaScript Functions

1. **`getActiveCourseData()`** - Get current course data
2. **`updateCourseData(updates)`** - Update course data
3. **`getCourseDataHistory()`** - Get version history
4. **`restoreCourseDataVersion(versionId)`** - Restore previous version
5. **`subscribeToCourseData(callback)`** - Real-time updates

## Data Structure

The course data follows this structure:

```javascript
{
  hero: {
    title: string,
    image: string,
    imageAlt: string,
    subtitle?: string
  },
  mainCourse: {
    title: string,
    description: string,
    modules: Array<{name: string, description: string}>,
    content: string[]
  },
  courseInfo: {
    sectionTitle: string,
    highlights: string[],
    startDate: string,
    startDateLabel: string,
    schedule: Array<{date: string, name: string}>,
    consultationWeek: string
  },
  yoga: {
    title: string,
    content: string[],
    pricingTitle: string,
    pricing: {
      einzelstunde: {label: string, min: number, max: number},
      zehnerkarte: {label: string, min: number, max: number}
    }
  },
  buttons: {
    registration: {text: string, href: string}
  },
  images: {
    main: {src: string, alt: string, title: string}
  },
  OnlineProdukt: {
    title: string,
    content: string[],
    pricingTitle: string
  }
}
```

## Security

- Row Level Security (RLS) is enabled
- Public read access for active course data
- Admin access for modifications (requires authentication)
- Version tracking for audit trail

## Troubleshooting

1. **Data not loading**: Check environment variables and Supabase connection
2. **Permission errors**: Verify RLS policies and authentication
3. **Version conflicts**: Use the admin interface to resolve version issues
4. **Real-time not working**: Check Supabase real-time configuration

## Migration from Static Data

The system includes fallback to static data if Supabase is unavailable, ensuring the site remains functional during database issues.
