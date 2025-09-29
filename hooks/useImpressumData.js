import { useState, useEffect } from 'react';
import { getImpressumContent } from '../app/actions/Impressunm/GetImpressum';

/**
 * Custom React hook for managing impressum content
 * @returns {Object} Impressum data state and management functions
 */
export function useImpressumData() {
  const [impressumData, setImpressumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load impressum data
  const loadImpressumData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getImpressumContent();
      
      if (result.success) {
        setImpressumData(result.data);
      } else {
        setError(result.error);
        
        // Fallback to default data structure if database fails
        setImpressumData({
          company_info: {
            title: "Angaben gemäß § 5 TMG",
            content: "Nikolina Baus\nForstenrieder Allee 140F\n81476 München",
            additionalData: { type: "address", format: "multiline" }
          },
          contact: {
            title: "Kontakt",
            content: "info@baus-physiotherapie.de",
            additionalData: { type: "email", link: "mailto:info@baus-physiotherapie.de" }
          },
          content_liability: {
            title: "Haftung für Inhalte",
            content: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich...",
            additionalData: { type: "legal_text", paragraphs: 2 }
          }
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImpressumData();
  }, []);

  return {
    impressumData,
    loading,
    error,
    refreshData: loadImpressumData
  };
}