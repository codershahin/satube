// import TextWithLinks from "@/components/text-with-links";
// import CommentInput from "@/components/youtube/coment-input";
// import Comments from "@/components/youtube/coments";
// import RelatedVideos from "@/components/youtube/related-videos";
// import YouTubeVideoPlayer from "@/components/youtube/youtube-video-player";
// import { db } from "@/lib/db";
// import Link from "next/link";
// import React from "react";

// type Props = {
//   params: {
//     videoId: string;
//   };
// };

// const Page = async ({ params: { videoId } }: Props) => {
//   const video = await db.video.findFirst({
//     where: { id: videoId },
//     include: {
//       user: true,
//     },
//   });

//   const handleCommentSubmit = (content: string) => {
//     // Replace this with your actual comment submission logic
//     const newComment = {
//       id: `${commentsData.length + 1}`,
//       user: "Current User", // Replace with actual user data
//       userImage: "https://via.placeholder.com/40x40", // Replace with actual user image URL
//       content,
//       timestamp: "just now",
//       likes: 0,
//       dislikes: 0,
//     };

//     // setCommentsData((prevComments) => [...prevComments, newComment]);
//   };

//   if (!video) {
//     return (
//       <div className="pl-[250px]">
//         <h2 className="text-2xl">No video found</h2>
//         <Link href="/youtube" className="text-blue-500 my-3 underline">
//           Go back
//         </Link>
//       </div>
//     );
//   }

//   const commentsData = await db.comment.findMany({
//     where: {
//       videoId: video.id,
//     },
//     include: {
//       user: {
//         select: {
//           name: true,
//           image: true,
//         },
//       },
//     },
//   });

//   return (
//     <div className="pl-[250px] py-10 text-white">
//       <div className="container mx-auto p-4 relative text-white">
//         <div
//         //   className="absolute top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
//         //   style={{ backgroundImage: `url(${video.user.image!})` }}
//         />
//         <div className="rounded-lg p-6">
//           <div className="mb-4 border-b">
//             {/* <video
//               width="100%"
//               height="400"
//               controls
//               className="rounded-lg h-[450px]"
//             >
//               <source src={video.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video> */}
//             <YouTubeVideoPlayer url={video.url} />
//           </div>

//           <div>
//             <Link
//               href={`/youtube/channel/${video.user.id}`}
//               className="flex items-center mb-4 "
//             >
//               <img
//                 src={video.user.image!}
//                 alt={`${video.user.name} favicon`}
//                 className="w-10 h-10 rounded-full mr-4"
//               />
//               <div>
//                 <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
//                 <p className="text-gray-500">{video.user.name}</p>
//               </div>
//             </Link>
//           </div>

//           <div className="mb-4 ">
//             <button className="bg-red-500 text-white px-4 py-2 mr-4">
//               Subscribe
//             </button>
//             <button className="bg-gray-200 text-gray-800 px-4 py-2">
//               Download
//             </button>
//           </div>

//           <p className="text-gray-500 mb-4">
//             {video.views.toLocaleString()} views
//           </p>

//           <div className="">
//             <p className="text-gray-400">
//               <TextWithLinks text={video.description!} />
//             </p>
//           </div>

//           <div className="flex mt-4 ">
//             <button className="flex items-center mr-4">
//               <svg
//                 className="w-6 h-6 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 15l7-7 7 7"
//                 ></path>
//               </svg>
//               Like
//             </button>
//             <button className="flex items-center mr-4">
//               <svg
//                 className="w-6 h-6 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 15l7-7 7 7"
//                 ></path>
//               </svg>
//               Dislike
//             </button>
//             <button className="flex items-center mr-4">
//               <svg
//                 className="w-6 h-6 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 ></path>
//               </svg>
//               Share
//             </button>
//             <button className="flex items-center">
//               <svg
//                 className="w-6 h-6 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 12h14M12 5l7 7-7 7"
//                 ></path>
//               </svg>
//               Copy Link
//             </button>
//           </div>

//           {/* Display Comments */}
//           {/* @ts-ignore */}
//           {commentsData && <Comments comments={commentsData!} />}

//           {/* Comment Input */}
//           <CommentInput videoId={video.id} />
//         </div>

//         {/* Related videos */}
//         <RelatedVideos videoId={video.id} userID={video.userId} />
//       </div>
//     </div>
//   );
// };

// {
//   /* <div className="container mx-auto p-4 relative">
// <div
//   className="absolute top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
//   style={{ backgroundImage: `url(${video.url!})` }}
// />
// <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg p-6">
//   <div className="mb-4">
//     <video
//       width="100%"
//       height="400"
//       controls
//       className="rounded-lg h-[450px]"
//     >
//       <source src={video.url} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   </div>

//   <div className="flex items-center mb-4">
//     <img
//       src={video.user.image!}
//       alt={`${video.user.name} favicon`}
//       className="w-10 h-10 rounded-full mr-4"
//     />
//     <div>
//       <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
//       <p className="text-gray-700">{video.user.name}</p>
//     </div>
//   </div>

//   <div className="mb-4">
//     <button className="bg-red-500 text-white px-4 py-2 mr-4">
//       Subscribe
//     </button>
//     <button className="bg-gray-200 text-gray-800 px-4 py-2">
//       Download
//     </button>
//   </div>

//   <p className="text-gray-500 mb-4">
//     {video.views.toLocaleString()} views
//   </p>
//   <p className="text-gray-800">{video.description}</p>

//   <div className="flex mt-4">
//     <button className="flex items-center mr-4">
//       <svg
//         className="w-6 h-6 mr-1"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M5 15l7-7 7 7"
//         ></path>
//       </svg>
//       Like
//     </button>
//     <button className="flex items-center mr-4">
//       <svg
//         className="w-6 h-6 mr-1"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M5 15l7-7 7 7"
//         ></path>
//       </svg>
//       Dislike
//     </button>
//     <button className="flex items-center mr-4">
//       <svg
//         className="w-6 h-6 mr-1"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//         ></path>
//       </svg>
//       Share
//     </button>
//     <button className="flex items-center">
//       <svg
//         className="w-6 h-6 mr-1"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M5 12h14M12 5l7 7-7 7"
//         ></path>
//       </svg>
//       Copy Link
//     </button>
//   </div>
// </div>
// </div> */
// }

// export default Page;

import React from "react";

type Props = {};

const Page = (props: Props) => {
  return <div>page</div>;
};

export default Page;
