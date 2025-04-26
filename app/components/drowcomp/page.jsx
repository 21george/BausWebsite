"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAboutme } from "../../../app/actions/aboutme/Getaboutme";
import { motion } from "framer-motion";
import meFoto from "../../../asset/images/IMG_0623.png";

export default function DrawerButton() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onPress = () => {
    setOpen(true);
  };
  useEffect(() => {
    async function fetchData() {
      const result = await getAboutme();
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
    <>
      <button
        onClick={onPress}
        className="btn btn-primary self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50 hover:bg-amber-900 transition duration-300"
      >
        Read More
      </button>
      <Dialog open={open} onClose={setOpen} className="fixed z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out"
        />

        <div className="fixed inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <DialogPanel
                  transition
                  className="pointer-events-auto relative w-screen max-w-xl transform transition duration-500 ease-in-out sm:duration-700"
                >
                  <TransitionChild>
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <DialogTitle className="text-lg font-semibold text-gray-900 text-center mb-4">
                        {data[0].P_tittle}
                      </DialogTitle>
                    </div>
                    <div className="relative px-4 sm:px-6">
                      <img
                        src={meFoto.src}
                        alt="Personal"
                        className="h-[400px] sm:h-[400px] w-full transition-transform object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 text-gray-700 leading-relaxed">
                      <p className="my-6 dark:text-gray-600 line-clamp-3">
                        {data[0].personal_deatails}
                      </p>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}
