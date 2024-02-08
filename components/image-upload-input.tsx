import React from "react";
import { Button } from "./ui/button";
import { Delete, UploadCloud } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import IconButton from "./IconButton";

type Props = {
  src: string;
  onChange: (url: string) => void;
};

const ImageUploadInput = ({ src, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      {/* @ts-ignore */}
      {src?.length ? (
        <div>
          {/* <VideoPlayer url={url} /> */}
          <img src={src!} className="w-[450px] h-auto" />
          <Button
            onClick={(e) => {
              e.preventDefault();
              onChange("");
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
          onUpload={(result: any) => {
            onChange(result?.info?.secure_url!);
          }}
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
  );
};

export default ImageUploadInput;
