"use client";
import { Category, User, Video } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Delete, Edit, Eye } from "lucide-react";
import Link from "next/link";
import IconButton from "../IconButton";
import { useRouter } from "next/navigation";
import axios from "axios";

type VideoType = Video & {
  category: Category;
  user: User;
};

type Props = {
  videos: VideoType[];
};

const VideosTable = ({ videos }: Props) => {
  const router = useRouter();
  const handleDelete = (vid: string) => {
    if (window.confirm("are you sure?")) {
      axios
        .delete(`/api/videos/${vid}`)
        .then(() => {
          router.refresh();
        })
        .catch((err) => {
          alert("Something went wrong.");
        });
    }
  };
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{video.videoId}</TableCell>
              <TableCell>
                <h3 className="truncate" title={video.title}>
                  {video.title}
                </h3>
                <Button size={"icon"}>
                  <Link
                    target="_blank"
                    href={`/watch/?v=${video.videoId}&user=${video.user.username}`}
                  >
                    <Eye />
                  </Link>
                </Button>
              </TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>{video.user.username}</TableCell>
              <TableCell>
                {new Date(video?.createdAt!).toLocaleString()}
              </TableCell>
              <TableCell>
                <IconButton
                  className="bg-emerald-500 text-white mb-2 hover:bg-opacity-80 "
                  Icon={<Edit className="" />}
                  handleClick={() =>
                    router.push(`/admin/manage-videos/${video.videoId}/edit`)
                  }
                />
                <IconButton
                  className="bg-red-500 text-white hover:bg-opacity-80"
                  Icon={<Delete />}
                  handleClick={() => handleDelete(video.videoId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideosTable;
