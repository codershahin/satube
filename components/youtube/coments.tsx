// // Comments.tsx
// import React from "react";

// interface Comment {
//   id: string;
//   user: string;
//   userImage: string; // Add userImage property
//   content: string;
//   timestamp: string;
// }

// interface CommentsProps {
//   comments: Comment[];
// }

// const Comments: React.FC<CommentsProps> = ({ comments }) => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Comments</h2>
//       {comments.map((comment) => (
//         <div key={comment.id} className="mb-4 flex">
//           <img
//             src={comment.userImage}
//             alt={`${comment.user} avatar`}
//             className="w-8 h-8 rounded-full mr-2"
//           />
//           <div>
//             <p className="text-gray-700 mb-1">{comment.user}</p>
//             <p className="text-gray-800">{comment.content}</p>
//             <p className="text-gray-500 text-sm">{comment.timestamp}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comments;
"use client";
// Comments.tsx
import React from "react";
import moment from "moment";
import TextWithLinks from "../text-with-links";
import { LucideThumbsDown, LucideThumbsUp, Reply } from "lucide-react";

interface Comment {
  id: string;
  user: {
    name: string;
    image: string;
  } | null;
  text: string;
  createdAt: string;
  likes?: number;
  dislikes?: number;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const handleLike = (commentId: string) => {
    // Implement your like logic here
    console.log(`Liked comment with id ${commentId}`);
  };

  const handleDislike = (commentId: string) => {
    // Implement your dislike logic here
    console.log(`Disliked comment with id ${commentId}`);
  };

  const handleReply = (commentId: string) => {
    // Implement your reply logic here
    console.log(`Replying to comment with id ${commentId}`);
  };

  return (
    <div className="border border-gray-600 p-2 my-5">
      <h2 className="text-2xl font-bold mb-4 border-b max-w-max">Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mb-4 bg-slate-800 border border-slate-700 p-2  flex items-start"
        >
          <img
            src={comment?.user?.image}
            alt={`${comment.user} avatar`}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <p className="text-gray-500">{comment?.user?.name}</p>
              <p className="text-gray-500 text-sm ml-2">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
            <div className="overflow-auto">
              <p className="text-gray-400 ">
                {<TextWithLinks text={comment.text} />}
              </p>
            </div>
            <div className="flex mt-2 space-x-4">
              <button
                className="flex items-center text-gray-500"
                onClick={() => handleLike(comment.id)}
              >
                {/* Placeholder like icon */}
                <LucideThumbsUp />
                {comment.likes}
              </button>
              <button
                className="flex items-center text-gray-500"
                onClick={() => handleDislike(comment.id)}
              >
                {/* Placeholder dislike icon */}
                <LucideThumbsDown />
                {comment.dislikes}
              </button>
              <button
                className="flex items-center text-gray-500"
                onClick={() => handleReply(comment.id)}
              >
                {/* Placeholder reply icon */}
                <Reply />
                Reply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
