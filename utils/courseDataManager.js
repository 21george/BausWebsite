import { createClient } from './superbase/client';
import { logger } from './logger';

/**
 * Course Data Management Utilities for Supabase
 */

export class CourseDataManager {
  constructor() {
    this.supabase = createClient();
  }

  /**
   * Get the current active course data
   * @returns {Promise<Object>} The formatted course data object
   */
  async getActiveCourseData() {
    try {
      const { data, error } = await this.supabase.rpc('get_active_course_data');
      
      if (error) {
        logger.error('Error fetching course data:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error('No active course data found');
      }

      return this.formatCourseData(data[0]);
    } catch (error) {
      logger.error('Failed to get active course data:', error);
      throw error;
    }
  }

  /**
   * Update course data
   * @param {Object} updates - The course data updates
   * @returns {Promise<string>} The new course data ID
   */
  async updateCourseData(updates) {
    try {
      const { data, error } = await this.supabase.rpc('update_course_data', {
        p_hero: updates.hero || null,
        p_main_course: updates.mainCourse || null,
        p_course_info: updates.courseInfo || null,
        p_yoga: updates.yoga || null,
        p_buttons: updates.buttons || null,
        p_images: updates.images || null,
        p_online_produkt: updates.OnlineProdukt || null
      });

      if (error) {
        logger.error('Error updating course data:', error);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error('Failed to update course data:', error);
      throw error;
    }
  }

  /**
   * Get course data history
   * @returns {Promise<Array>} Array of course data versions
   */
  async getCourseDataHistory() {
    try {
      const { data, error } = await this.supabase.rpc('get_course_data_history');
      
      if (error) {
        logger.error('Error fetching course data history:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error('Failed to get course data history:', error);
      throw error;
    }
  }

  /**
   * Restore a previous version of course data
   * @param {string} versionId - The ID of the version to restore
   * @returns {Promise<string>} The new course data ID
   */
  async restoreCourseDataVersion(versionId) {
    try {
      const { data, error } = await this.supabase.rpc('restore_course_data_version', {
        p_version_id: versionId
      });

      if (error) {
        logger.error('Error restoring course data version:', error);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error('Failed to restore course data version:', error);
      throw error;
    }
  }

  /**
   * Format the database course data into the expected frontend format
   * @param {Object} dbData - Raw data from database
   * @returns {Object} Formatted course data
   */
  formatCourseData(dbData) {
    return {
      hero: dbData.hero,
      mainCourse: {
        title: dbData.main_course.title,
        description: dbData.main_course.description,
        modules: dbData.main_course.modules,
        content: dbData.main_course.content
      },
      courseInfo: {
        sectionTitle: dbData.course_info.sectionTitle,
        highlights: dbData.course_info.highlights,
        startDate: dbData.course_info.startDate,
        startDateLabel: dbData.course_info.startDateLabel,
        schedule: dbData.course_info.schedule,
        consultationWeek: dbData.course_info.consultationWeek
      },
      yoga: dbData.yoga,
      buttons: dbData.buttons,
      images: dbData.images,
      OnlineProdukt: {
        title: dbData.online_produkt.title,
        content: dbData.online_produkt.content,
        pricingTitle: dbData.online_produkt.pricingTitle
      }
    };
  }

  /**
   * Real-time subscription to course data changes
   * @param {Function} callback - Function to call when data changes
   * @returns {Object} Subscription object with unsubscribe method
   */
  subscribeToCourseData(callback) {
    const subscription = this.supabase
      .channel('course_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'course_data',
          filter: 'is_active=eq.true'
        },
        async (payload) => {
          try {
            const freshData = await this.getActiveCourseData();
            callback(freshData);
          } catch (error) {
            logger.error('Error handling course data change:', error);
          }
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        this.supabase.removeChannel(subscription);
      }
    };
  }
}

// Export a singleton instance
export const courseDataManager = new CourseDataManager();

// Export individual functions for convenience
export const getActiveCourseData = () => courseDataManager.getActiveCourseData();
export const updateCourseData = (updates) => courseDataManager.updateCourseData(updates);
export const getCourseDataHistory = () => courseDataManager.getCourseDataHistory();
export const restoreCourseDataVersion = (versionId) => courseDataManager.restoreCourseDataVersion(versionId);
export const subscribeToCourseData = (callback) => courseDataManager.subscribeToCourseData(callback);