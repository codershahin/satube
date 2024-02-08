"use client";
// CommentInput.tsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface CommentInputProps {
  videoId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ videoId }) => {
  const [commentContent, setCommentContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (commentContent.trim() !== "") {
      setLoading(true);
      try {
        //   onCommentSubmit(commentContent);
        // setCommentContent("");
        if (videoId) {
          const res = await axios.post(`/api/videos/${videoId}/comments`, {
            videoId,
            comment: commentContent,
          });
          toast.success("comment has been added successfully");
          setCommentContent("");
        } else {
          console.error("Video ID not provided");
          toast.error("Video ID not provided");
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data || error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        disabled={loading}
        readOnly={loading}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Add a public comment..."
        className="w-full bg-slate-800 p-2 border rounded-md"
        rows={3}
      />
      <Button
        disabled={loading}
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comment
      </Button>
    </form>
  );
};

export default CommentInput;
