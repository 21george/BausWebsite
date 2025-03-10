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
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }   

    return (
        <section className="flex flex-col items-center mt-2 mb-11 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4"
        >
        <h2 className="text-2xl text-gray-800 mt-4 mb-14">
                {data[0].Note_description}
            </h2>
             <div className="grid md:grid-cols-2 gap-8 mt-1">
        <div>
          <p className="text-gray-800 text-lg">
            {data[0].points}
          </p>
        </div>
        <div>
          <p className=" text-gray-800 text-lg">
            {data[0].points1}
          </p>
                </div>
                 <div>
          <p className="text-gray-800 text-lg">
            {data[0].points2}
          </p>
        </div>
      </div>
        </motion.div>   
        </section>
    )
}

export default HeilkundeGrid;