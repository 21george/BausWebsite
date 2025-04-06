import { getHeilkundeInfo } from "../../actions/HeilkundeAction/GetHeilkunde";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeilkundeGrid = () => {
    const [data, setData] = useState(null);
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
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-gray-500 p-4">Loading...</div>;
    }   

    return (
        <section className="w-full flex flex-col items-center mt-2 mb-8 sm:mb-11 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full text-center space-y-4 max-w-6xl"
            >
                <h2 className="text-xl sm:text-2xl text-gray-800 mt-4 mb-8 sm:mb-14 px-2 sm:px-0">
                    {data[0].Note_description}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                            {data[0].points}
                        </p>
                    </div>
                    
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                            {data[0].points1}
                        </p>
                    </div>
                    
                    <div className=" p-4 sm:p-6  shadow-sm md:col-span-2">
                        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                            {data[0].points2}
                        </p>
                    </div>
                </div>
            </motion.div>   
        </section>
    )
}

export default HeilkundeGrid;