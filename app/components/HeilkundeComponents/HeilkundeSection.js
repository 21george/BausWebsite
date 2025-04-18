import React, { useEffect, useState } from 'react';
import { getHeilkundeInfo } from '../../actions/HeilkundeAction/GetHeilkunde';
import { motion } from "framer-motion";

const HeilkundeSection = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getHeilkundeInfo();
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error);
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="flex flex-col h-full w-full items-center mt-2 mb-11 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
            {data.map((item, index) => (
                <p key={index} className="dark:text-gray-600 text-base md:text-base lg:text-lg mb-4">
                    {item.paragraphs}
                </p>
            ))}
            </motion.div>
        </section>
    );
};

export default HeilkundeSection;
