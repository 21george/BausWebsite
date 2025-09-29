import { useState, useEffect, useCallback } from 'react';
import { courseDataManager } from '../utils/courseDataManager';
import { logger } from '../utils/logger';

/**
 * Custom React hook for managing course data
 * @param {Object} options - Configuration options
 * @param {boolean} options.realtime - Enable real-time updates
 * @returns {Object} Course data state and management functions
 */
export function useCourseData(options = {}) {
  const { realtime = false } = options;
  
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Load initial course data
  const loadCourseData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseDataManager.getActiveCourseData();
      setCourseData(data);
    } catch (err) {
      setError(err);
      logger.error('Failed to load course data:', err);
      
      // Fallback to default data structure if database fails
      setCourseData({
        hero: {
          title: "Kurse & Workshops",
          image: "/Images/IMG_7712.jpg",
          imageAlt: "Kurse und Workshops Hero"
        },
        mainCourse: {
          title: "Next Me - Dein Kurs nach der Entbindung",
          description: "Unser erstes Kennenlernen startet mit einem 1:1 Termin bei uns in der Praxis, zur Untersuchung und Aufnahme. Bei Bedarf auch einer Sonografie der Bauchmuskulatur und/oder der Bauchorgane. Danach starten deine 4 Module bei uns in der Praxis:",
          modules: [
            { name: "Modul 1", description: "Beckenboden & Rumpf" },
            { name: "Modul 2", description: "Training" },
            { name: "Modul 3", description: "Training & Hormone" },
            { name: "Modul 4", description: "Beckenbodenentspannung" }
          ],
          content: [
            "Wir starten den Kurs in der Gruppe mit dem Verständnis für den Beckenboden und den Rumpf, danach der Verbindung zu diesen Strukturen.",
            "Die Rückbildung startet ab Tag 1 nach der Entbindung.\nWir müssen besonders in der 2. Wundheilungsphase Reize zur spezifischen Anpassung in die Struktur geben damit wir das Gewebe qualitativ aufbauen.",
            "Weiter geht es mit der Edukation über hormonelle Prozesse und wie dich diese postpartal beeinflussen können. Außerdem besprechen wir deinen Trainingsplan für die nächsten Wochen.",
            "Im letzten Modul geht es rund um Entspannungstechniken.\nWir werden gemeinsam atmen, den Beckenboden dehnen und mobilisieren.\nAn diesem Tag werden zusätzlich noch alle weiteren Fragen geklärt und damit ist der Kurs bei uns auch schon abgeschlossen."
          ]
        },
        courseInfo: {
          sectionTitle: "Alle Infos auf einen Blick:",
          highlights: [
            "5 wöchige Betreuung mit Trainingsplan",
            "Kursteilnahme ab der 2. Woche nach Entbindung",
            "1:1 Termin in der Woche vom {consultationWeek} nach Vereinbarung"
          ],
          startDate: "06.11.2024",
          startDateLabel: "Kursstart am:",
          schedule: [
            { date: "01. November", name: "Modul 1" },
            { date: "08. November", name: "Modul 2" },
            { date: "15. November", name: "Modul 3" },
            { date: "22. November", name: "Modul 4" }
          ],
          consultationWeek: "20.11-25.11"
        },
        yoga: {
          title: "Yoga",
          content: [
            "Hier in der Praxis findest du am Mittwoch PhysioFlowYoga.\nDas physiotherapeutische Yoga Konzept ist Ashtanga geprägt.\nIn jeder ersten Woche des Monats finden Einsteigerkurse statt. In der restlichen Zeit findest du leichte bis mittelschwere Yogastunden.",
            "Ich lade dich herzlich ein, in deinem Körper anzukommen, die Selbsterfahrung zu machen sich Zeit für sich zu nehmen & letztlich zu entschleunigen. Die Kursteilnahme ist ausschließlich durch eine Voranmeldung möglich.",
            "Du kannst bei meinen Yogastunden auf Grund deines Einkommens und deiner Möglichkeiten selbst entscheiden, welchen finanziellen Ausgleich du für meine Arbeit geben kannst und möchtest."
          ],
          pricingTitle: "Preise nach Preisstaffel:",
          pricing: {
            einzelstunde: { label: "Einzelstunde", min: 15, max: 30 },
            zehnerkarte: { label: "10er Karte", min: 170, max: 210 }
          }
        },
        buttons: {
          registration: {
            text: "📅 KURSANMELDUNG",
            href: "/KurseForm"
          }
        },
        images: {
          main: {
            src: "/Images/IMG_7712.jpg",
            alt: "Kurse und Workshops für Gesundheit und Wohlbefinden",
            title: "Kurse & Workshops - Baus Praxis"
          }
        },
        OnlineProdukt: {
          title: "Digitale Online Kurse",
          content: [
            "Coming Soon"
          ],
          pricingTitle: "",
        }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Update course data
  const updateCourseData = useCallback(async (updates) => {
    try {
      setUpdating(true);
      setError(null);
      await courseDataManager.updateCourseData(updates);
      await loadCourseData(); // Refresh data after update
      return true;
    } catch (err) {
      setError(err);
      logger.error('Failed to update course data:', err);
      return false;
    } finally {
      setUpdating(false);
    }
  }, [loadCourseData]);

  // Get course data history
  const getCourseDataHistory = useCallback(async () => {
    try {
      return await courseDataManager.getCourseDataHistory();
    } catch (err) {
      logger.error('Failed to get course data history:', err);
      throw err;
    }
  }, []);

  // Restore course data version
  const restoreCourseDataVersion = useCallback(async (versionId) => {
    try {
      setUpdating(true);
      setError(null);
      await courseDataManager.restoreCourseDataVersion(versionId);
      await loadCourseData(); // Refresh data after restore
      return true;
    } catch (err) {
      setError(err);
      logger.error('Failed to restore course data version:', err);
      return false;
    } finally {
      setUpdating(false);
    }
  }, [loadCourseData]);

  // Effect for initial data loading
  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  // Effect for real-time updates
  useEffect(() => {
    if (!realtime || !courseData) return;

    const subscription = courseDataManager.subscribeToCourseData((newData) => {
      setCourseData(newData);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [realtime, courseData]);

  return {
    courseData,
    loading,
    error,
    updating,
    updateCourseData,
    getCourseDataHistory,
    restoreCourseDataVersion,
    refreshCourseData: loadCourseData
  };
}