"use client";
import HeroSection from '@/app/components/HeroComponent/page';
import React from 'react';

async function getDialoBlog(id) {
    const res = await fetch(`http://localhost:4000/workdetails/${id}`, {
        next: {
            revalidate: 60,
        },
    });
    return res.json();
}

export default async function FeatureDetails({ params }) {
    const detailsBlog = await getDialoBlog(params.id);
    return (
        <main className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
            <HeroSection backgroundImage={detailsBlog.image.src} title={""} discritption={""} />
            <div className="container mx-auto space-y-6">
                <h1 className="text-3xl font-bold">{detailsBlog.title}</h1>
                <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="text-gray-600">{detailsBlog.details}</p>
                </div>
            </div>
        </main>
    );
}
