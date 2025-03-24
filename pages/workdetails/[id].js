import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

async function getDetailById(id) {
  const res = await fetch(`http://localhost:3001/workdetails/${id}`);

  if (!res.ok) {
    console.error('Failed to fetch workdetails:', res.status);
    return null;
  }

  return res.json();
}

export default function WorkDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchDetail() {
        const data = await getDetailById(id);
        setDetail(data);
      }

      fetchDetail();
    }
  }, [id]);

  if (!detail) {
    return <div className="flex items-center justify-center h-screen">
             <div className="text-xl font-semibold">Loading...</div>
           </div>;
  }

  return (

    <div className="p-6 space-y-6">
      <img
        src={detail.image}
        alt={`Image ${detail.id}`}
        className="h-auto dark:bg-gray-500 bg-fixed aspect-video"
      />
      <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
        <h3 className="text-3xl font-bold">{detail.title}</h3>
        <p className="my-6 dark:text-gray-600">{detail.description}</p>
      </div>
    </div>
  );
}