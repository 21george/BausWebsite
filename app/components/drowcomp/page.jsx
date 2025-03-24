'use client';
import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { getAboutme } from "../../../app/actions/aboutme/Getaboutme";
import { motion } from "framer-motion";

export default function DrawerButton() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onPress = () => {
    setOpen(true)
  }

  
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
      <button onClick={onPress}  className=" btn btn-primary self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50">
        Read More
      </button>
      <Dialog open={open} onClose={setOpen} className="fixe  z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
          
        <div className="fixed inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            
          <div className="absolute inset-0 overflow-hiddn">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-xl transform transition duration-800 ease-in-out data-closed:translate-x-full sm:duration-700"
                >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                      >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6  shadow-xl">
                  <div className="px-4 sm:px-6 ">
                    <DialogTitle className="text-base top-12 font-semibold text-gray-900">{data[0].P_tittle}</DialogTitle>
                  </div>
                  <div className="relative mt-6 top-12 flex-1 px-4 sm:px-6">{data[0].personal_deatails}</div>
                </div>
              </DialogPanel>
            </div>
          </div>
                      </motion.div>
        </div>
      </Dialog>
    </>
  )
}
