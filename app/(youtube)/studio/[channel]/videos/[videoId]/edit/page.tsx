"use client";
import React, { FormEvent, useEffect, useState } from "react";

import { Category } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Delete, UploadCloud } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import IconButton from "@/components/IconButton";
import VideoPlayer from "@/components/VideoPlayer";
type Props = {
  params: {
    channel: string;
    videoId: string;
  };
};

const Page = ({ params: { channel, videoId } }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [thumbnail, setThumbnail] = useState<string>();
  // @ts-ignore
  const handleUpload = (result, widget) => {
    console.log("Widget", widget);
    console.log("Result", result);
    if (result.info) {
      setUrl(result.info.secure_url);
    }
  };
  // @ts-ignore
  const handleUploadImage = (result, widget) => {
    console.log("Widget", widget);
    console.log("Result", result);
    if (result.info) {
      setThumbnail(result.info.secure_url);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!url && !title) || !url || !title || !categoryId || !thumbnail) {
      return toast.error("Please filed all the fields");
    }
    // send to api for save in db
    try {
      setLoading(true);
      const res = await axios.patch(
        `/api/youtube/channel/${channel}/videos/${videoId}`,
        {
          title,
          url,
          description,
          categoryId,
          thumbnail,
        }
      );
      toast.success("Video uploaded successfully.");
      // router.push("/");
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || error?.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadVideo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/youtube/channel/${channel}/videos/${videoId}`
        );

        setTitle(res.data.title);
        setDescription(res.data.description);
        setThumbnail(res.data.thumbnail);
        setUrl(res.data.url);
        setCategoryId(res.data.categoryId);
      } catch (error) {
        toast.error("Unable to load video.");
      } finally {
        setLoading(false);
      }
    };

    if (channel && videoId) {
      loadVideo();
    }
  }, [channel, videoId]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error: any) => {
        router.push(
          `/admin/manage-videos?error=unable_to_get_categories_edit-${error.message}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="md:container mx-auto my-20">
      <Card className="md:max-w-2xl w-full mx-auto">
        <CardHeader>
          <CardTitle>Edit Your Video</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full space-y-3">
              <Skeleton className="w-full h-[40px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[40px]" />
              <Skeleton className="w-full h-[150px]" />
              <Skeleton className="w-[100px] h-[40px]" />
              <Skeleton className="w-[200px] h-[40px]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">Video Title</label>
                <Input
                  value={title!}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title.."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">
                  Video Description
                </label>
                <Textarea
                  value={description!}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description.."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">
                  Select a category
                </label>
                <select
                  className="w-full border p-2 rounded-md"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((ca) => (
                    <option value={ca.id} key={ca.id}>
                      {ca.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full border flex flex-col p-2 space-y-3">
                <h2 className="text-lg text-slate-800">Video Thumbnail</h2>
                {/* @ts-ignore */}
                {thumbnail?.length ? (
                  <div>
                    {/* <VideoPlayer url={url} /> */}
                    <img src={thumbnail} className="w-[450px] h-auto" />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnail("");
                      }}
                      className="mt-4"
                      variant={"destructive"}
                    >
                      <Delete />
                    </Button>
                  </div>
                ) : (
                  <CldUploadButton
                    onSourceChanged={(e) => console.log("sourced changed:", e)}
                    onUpload={handleUploadImage}
                    options={{
                      multiple: false,
                      resourceType: "image",
                      maxVideoFileSize: 1048576 * 150,
                    }}
                    uploadPreset="fdef2lab"
                  >
                    <Button
                      variant={"outline"}
                      className="flex w-full h-15 justify-center items-center bg-gray-200 p-2 rounded-md"
                    >
                      <IconButton
                        handleClick={() => {}}
                        className="bg-transparent"
                        Icon={<UploadCloud />}
                      />
                    </Button>
                  </CldUploadButton>
                )}
              </div>
              <div className="w-full border flex flex-col p-2 space-y-3">
                <h2 className="text-lg text-slate-800">Upload Video</h2>
                {/* @ts-ignore */}
                {url ? (
                  <div>
                    <VideoPlayer url={url} />
                    {/* <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setUrl(null);
                      }}
                      className="mt-4"
                      variant={"destructive"}
                    >
                      <Delete />
                    </Button> */}
                  </div>
                ) : (
                  <CldUploadButton
                    onSourceChanged={(e) => console.log("sourced changed:", e)}
                    onUpload={handleUpload}
                    options={{
                      multiple: false,
                      resourceType: "video",
                      maxVideoFileSize: 1048576 * 150,
                    }}
                    uploadPreset="fdef2lab"
                  >
                    <Button
                      variant={"outline"}
                      className="flex w-full h-15 justify-center items-center bg-gray-200 p-2 rounded-md"
                    >
                      <IconButton
                        handleClick={() => {}}
                        className="bg-transparent"
                        Icon={<UploadCloud />}
                      />
                    </Button>
                  </CldUploadButton>
                )}
              </div>

              {loading ? (
                <Button
                  variant={"destructive"}
                  className="disabled:bg-gray-300 text-slate-900"
                  disabled
                >
                  Update Video...
                </Button>
              ) : (
                <Button variant={"destructive"} className="bg-green-500">
                  Update Video
                </Button>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
