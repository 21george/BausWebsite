// const WorkDetails = ({ workDetails }) => {
//   return (
//     <section className="py-12 px-4">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Unsere Leistungen
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {workDetails.map((work) => (
//             <div
//               key={work.id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               <img
//                 src={work.image}
//                 alt={work.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
//                 <p className="text-gray-600 mb-4">{work.description}</p>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
//                   {work.buttonText}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default WorkDetails;
