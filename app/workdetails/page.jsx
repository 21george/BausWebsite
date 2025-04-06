"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { HeroSection } from "../../app/components/HeroComponent/page";


import defaultImage1 from "../../asset/images/Massag.png";
import defaultImage2 from "../../asset/images/IMG_3385.png";
import defaultImage3 from "../../asset/images/womenyoga.png";

const defaultImages = {
  1: defaultImage1,
  2: defaultImage2,
  3: defaultImage3,
};

async function fetchDataById(table, id) {
  try {
    const response = await fetch(`/api/${table}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${table} data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${table} data:`, error);
    throw error;
  }
}

export default function WorkDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState('');

  useEffect(() => {
    async function loadDetail() {
      try {
        // Determine which table to query based on ID pattern or other logic
        const table = id.startsWith('H') ? 'HeilkundeInfos' : 'Physiotherapie';
        setDataType(table);
        
        const result = await fetchDataById(table, id);
        
        if (result.success) {
          setDetail(result.data);
        } else {
          setError(result.error || "Detail not found");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    
    loadDetail();
  }, [id]);

  // ... (keep all your existing loading, error, and empty states)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-4"
    >
      {/* Hero Section */}
      <HeroSection
        backgroundImage={defaultImages[detail?.id] || defaultImage1}
        className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center"
        title={detail?.title || "Work Detail"}
        description=""
        aria-label="Main hero section"
      />

      {/* Main Content */}
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(dataType === 'HeilkundeInfos' ? '/heilkunde' : '/physiotherapie')}
          className="flex items-center justify-center w-fit mx-auto text-amber-600 hover:text-amber-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to {dataType === 'HeilkundeInfos' ? 'Heilkunde' : 'Physiotherapie'}
        </motion.button>

        {/* Content Section */}
        {detail && (
          <section className="w-full max-w-4xl mx-auto px-2 sm:px-4">
            {/* ... rest of your detail rendering code ... */}
          </section>
        )}
      </div>
    </motion.div>
  );
}