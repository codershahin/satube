"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CldUploadButton, type CldUploadWidgetResults } from "next-cloudinary";
import { Button } from "./ui/button";
import IconButton from "./IconButton";
import { Delete, UploadCloud } from "lucide-react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Category } from "@prisma/client";
import toast from "react-hot-toast";
type Props = {
  channel: string;
};

const Upload = (props: Props) => {
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
      const res = await axios.post(
        `/api/youtube/channel/${props.channel}/videos`,
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
      <Card className="md:max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Video</CardTitle>
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
                <label className="text-sm text-slate-800">Title</label>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title.."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-800">Description</label>
                <Textarea
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
                <h2 className="text-lg text-slate-800">Upload Thumbnail</h2>
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
                  Upload Video...
                </Button>
              ) : (
                <Button variant={"destructive"} className="bg-green-500">
                  Upload Video
                </Button>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default Upload;
