"use client"
import HeroSection from '@/app/components/HeroComponent/page';
import React, { useEffect, useState } from 'react';

async function getDialoBlog(id) {
    const res = await fetch(`http://localhost:3001/workdetails/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        console.error("Failed to fetch workdetails:", res.status);
        return null;
    }

    return res.json();
}

export default function FeatureDetails({ params }) {
    const [detailsBlog, setDetailsBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDialoBlog(params.id);
                if (data) {
                    setDetailsBlog(data);
                } else {
                    setError("Details not found.");
                }
            } catch (err) {
                setError("An error occurred while fetching details.");
            }
        }

        fetchData();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!detailsBlog) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
            <HeroSection 
                backgroundImage={detailsBlog.image?.src || detailsBlog.image} 
                title={detailsBlog.title} 
                description={detailsBlog.description} 
            />
            <div className="container mx-auto space-y-6">
                <h1 className="text-3xl font-bold">{detailsBlog.title}</h1>
                <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="text-gray-600">{detailsBlog.details}</p>
                </div>
            </div>
        </main>
    );
}