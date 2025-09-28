// Client-side utility for fetching courses data
// This avoids the webpack error when trying to use server actions in client components

export async function fetchCourses() {
    try {
        const response = await fetch('/api/get-courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return {
            success: false,
            error: error.message,
            data: []
        };
    }
}