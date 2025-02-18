
// const VideoModal = ({ isOpen, onClose, selectedVideo }) => {
//   if (!isOpen || !selectedVideo) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
//       <div className="relative w-full max-w-4xl mx-4">
//         <video className="w-full rounded-lg" controls autoPlay muted loop>
//           <source src={selectedVideo.videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors duration-200"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };
// export default VideoModal;