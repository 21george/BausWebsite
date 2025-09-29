// Client-side utility for fetching courses data
// This avoids the webpack error when trying to use server actions in client components

import { logger } from './logger';

export async function fetchOnlineCourses() {
    try {
        const response = await fetch('/api/get-courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        logger.error('Error fetching courses:', error);
        throw error;
    }
}