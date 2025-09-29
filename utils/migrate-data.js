/**
 * Supabase Data Migration and Setup Utility
 * Run this script to populate your database with initial data
 */

import { createClient } from './utils/superbase/client.js';

const supabase = createClient();

// Sample data for initial setup
const initialData = {
  aboutMe: {
    P_tittle: "Nikolina Baus - Ihre Gesundheitsexpertin",
    P_description: "Als erfahrene Physiotherapeutin und Heilpraktikerin begleite ich Sie auf Ihrem Weg zu optimaler Gesundheit und Wohlbefinden. Mit meiner langjährigen Erfahrung in der Behandlung von Frauen, insbesondere in der Zeit nach der Entbindung, biete ich Ihnen individuelle und ganzheitliche Therapieansätze.",
    image_url: "/Images/IMG_7740.png"
  },

  footer: {
    Adresse: "Musterstraße 123, 12345 Musterstadt",
    Phone_Number: "+49 123 456789",
    EMail: "info@baus-praxis.de",
    description: "Ihre Praxis für Physiotherapie und Heilkunde - Ganzheitliche Gesundheit für Körper und Seele"
  },

  impressum: {
    title: "Impressum",
    content: "Angaben gemäß § 5 TMG",
    address: "Nikolina Baus\nMusterstraße 123\n12345 Musterstadt",
    contact_info: "Telefon: +49 123 456789\nE-Mail: info@baus-praxis.de",
    legal_info: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Nikolina Baus"
  },

  workDetails: [
    {
      id: "H1",
      title: "Naturheilkunde",
      description: "Ganzheitliche Behandlung mit natürlichen Methoden",
      category: "Heilkunde",
      image_url: "/Images/IMG_1195.jpg"
    },
    {
      id: "P1", 
      title: "Physiotherapie",
      description: "Professionelle physiotherapeutische Behandlung",
      category: "Physiotherapie",
      image_url: "/Images/Massag.png"
    },
    {
      id: "P2",
      title: "Rückbildung",
      description: "Spezialisierte Rückbildungstherapie nach der Entbindung",
      category: "Physiotherapie", 
      image_url: "/Images/InerselfTuch.png"
    }
  ],

  heilkundeInfo: {
    title: "Naturheilkunde & Ganzheitliche Gesundheit",
    description: "Entdecken Sie die Kraft der Naturheilkunde für Ihr Wohlbefinden. Mit bewährten naturheilkundlichen Methoden unterstütze ich Sie dabei, Ihre Gesundheit zu stärken und das natürliche Gleichgewicht Ihres Körpers wiederzufinden.",
    features: "Individuelle Beratung und Behandlung",
    features_1: "Natürliche Heilmethoden ohne Nebenwirkungen",
    features_2: "Ganzheitlicher Ansatz für Körper, Geist und Seele",
    image_url: "/Images/IMG_1195.jpg"
  },

  physiotherapieInfo: {
    title: "Professionelle Physiotherapie",
    description: "Moderne physiotherapeutische Behandlungsmethoden für Ihre optimale Genesung. Ob nach Verletzungen, bei chronischen Beschwerden oder zur Prävention - ich begleite Sie kompetent auf Ihrem Weg zur Gesundheit.",
    features: "Manuelle Therapie und Krankengymnastik",
    features_1: "Spezialisierung auf Frauengesundheit",
    features_2: "Rückbildung und postnatale Betreuung",
    image_url: "/Images/Massag.png"
  },

  onlineCourse: {
    title: "Next Me - Online Rückbildungskurs",
    description: "Ihr umfassender Online-Kurs für die Zeit nach der Entbindung. Profitieren Sie von professioneller Anleitung und flexiblem Lernen von zu Hause aus.",
    price: 149.99,
    category: "Rückbildung",
    duration_weeks: 8,
    image_url: "/Images/IMG_7712.jpg"
  },

  courseData: {
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
        { name: "Modul 3", description: "Mobilisation" },
        { name: "Modul 4", description: "Entspannung" }
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
      ]
    }
  }
};

// Migration functions
export async function migrateAboutMe() {
  try {
    const { data, error } = await supabase
      .from('Aubout_me')
      .upsert([initialData.aboutMe]);
    
    if (error) throw error;
    console.log('✅ About Me data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating About Me data:', error);
    return { success: false, error };
  }
}

export async function migrateFooter() {
  try {
    const { data, error } = await supabase
      .from('Footer')
      .upsert([initialData.footer]);
    
    if (error) throw error;
    console.log('✅ Footer data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Footer data:', error);
    return { success: false, error };
  }
}

export async function migrateImpressum() {
  try {
    const { data, error } = await supabase
      .from('impressum')
      .upsert([initialData.impressum]);
    
    if (error) throw error;
    console.log('✅ Impressum data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Impressum data:', error);
    return { success: false, error };
  }
}

export async function migrateWorkDetails() {
  try {
    const { data, error } = await supabase
      .from('workdetails')
      .upsert(initialData.workDetails);
    
    if (error) throw error;
    console.log('✅ Work Details data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Work Details data:', error);
    return { success: false, error };
  }
}

export async function migrateHeilkundeInfo() {
  try {
    const { data, error } = await supabase
      .from('HeilkundeInfos')
      .upsert([initialData.heilkundeInfo]);
    
    if (error) throw error;
    console.log('✅ Heilkunde Info data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Heilkunde Info data:', error);
    return { success: false, error };
  }
}

export async function migratePhysiotherapieInfo() {
  try {
    const { data, error } = await supabase
      .from('Physiotherapie')
      .upsert([initialData.physiotherapieInfo]);
    
    if (error) throw error;
    console.log('✅ Physiotherapie Info data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Physiotherapie Info data:', error);
    return { success: false, error };
  }
}

export async function migrateOnlineCourse() {
  try {
    const { data, error } = await supabase
      .from('online_courses')
      .upsert([initialData.onlineCourse]);
    
    if (error) throw error;
    console.log('✅ Online Course data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Online Course data:', error);
    return { success: false, error };
  }
}

export async function migrateCourseData() {
  try {
    // Use the update_course_data function to ensure proper versioning
    const { data, error } = await supabase.rpc('update_course_data', {
      p_hero: initialData.courseData.hero,
      p_main_course: initialData.courseData.mainCourse,
      p_course_info: initialData.courseData.courseInfo,
      p_yoga: null,
      p_buttons: null,
      p_images: null,
      p_online_produkt: null
    });
    
    if (error) throw error;
    console.log('✅ Course Data migrated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error migrating Course Data:', error);
    return { success: false, error };
  }
}

// Main migration function
export async function runFullMigration() {
  console.log('🚀 Starting full database migration...');
  
  const results = await Promise.allSettled([
    migrateAboutMe(),
    migrateFooter(),
    migrateImpressum(),
    migrateWorkDetails(),
    migrateHeilkundeInfo(),
    migratePhysiotherapieInfo(),
    migrateOnlineCourse(),
    migrateCourseData()
  ]);
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  const failed = results.filter(r => r.status === 'rejected' || !r.value.success).length;
  
  console.log(`\n📊 Migration Results:`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed migrations:');
    results.forEach((result, index) => {
      if (result.status === 'rejected' || !result.value.success) {
        const migrationNames = [
          'About Me', 'Footer', 'Impressum', 'Work Details',
          'Heilkunde Info', 'Physiotherapie Info', 'Online Course', 'Course Data'
        ];
        console.log(`- ${migrationNames[index]}: ${result.reason || result.value.error}`);
      }
    });
  }
  
  return { successful, failed, total: results.length };
}

// Individual test functions
export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('Aubout_me')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Database connection successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, error };
  }
}

// Export for use in other files
export { initialData };

// If running directly (for CLI usage)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running database migration...');
  runFullMigration().then(() => {
    console.log('Migration completed!');
    process.exit(0);
  }).catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}