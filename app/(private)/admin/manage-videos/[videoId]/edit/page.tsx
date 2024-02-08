"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { CldUploadButton, type CldUploadWidgetResults } from "next-cloudinary";
import { Delete, UploadCloud } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/IconButton";
import { Category } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  params: {
    videoId: string;
  };
};

const Page = ({ params: { videoId } }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [categoryId, setCategoryId] = useState<string>();

  // @ts-ignore
  const handleUpload = (result, widget) => {
    console.log("Widget", widget);
    console.log("Result", result);
    if (result.info) {
      setUrl(result.info.secure_url);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!url && !title) || !url || !title || !categoryId) {
      return toast({
        className: "bg-red-500 text-white",
        title: "Validation error!",
        description: "Please Fill out all filed.",
      });
    }
    // send to api for save in db
    try {
      setLoading(true);
      await axios.patch(`/api/videos/${videoId}`, {
        title,
        url,
        description,
        categoryId,
      });
      toast({
        className: "bg-green-500 text-white",
        title: "Success!",
        description: "Video uploaded successfully.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        className: "bg-red-500 text-white",
        title: "Someting went wrong!",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/videos/${videoId}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setUrl(res.data.url);
      })
      .catch((error: any) => {
        router.push(
          `/admin/manage-videos?error=unable_to_get_video_edit-${error.message}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        setLoading(true);
      });
  }, []);

  return (
    <div className="md:container mx-auto my-20">
      <Card className="md:max-w-lg mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Update Video</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full space-y-3">
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[50px]" />
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[250px]" />
              <Skeleton className="w-[100px] h-[40px]" />
              <Skeleton className="w-[200px] h-[40px]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">Title</label>
                <Input
                  defaultValue={title!}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title.."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">Description</label>
                <Textarea
                  defaultValue={description!}
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
                  onBlur={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((ca) => (
                    <option value={ca.id} key={ca.id}>
                      {ca.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                {/* @ts-ignore */}
                {url ? (
                  <div>
                    <VideoPlayer url={url} />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setUrl(null);
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
