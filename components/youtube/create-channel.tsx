"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import ImageUploadInput from "../image-upload-input";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const formSchema = z.object({
  name: z.string().min(2).max(15),
  username: z.string().min(2).max(15),
  bio: z.string().min(2).max(50),
  logo: z.string().min(2),
  banner: z.string().min(2),
  email: z.string().email().min(2).max(50),
});

const CreateChannel = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("here");
    try {
      const res = await axios.post(`/api/youtube/channel`, data);
      if (res.status === 201) {
        toast.success("Channel created successfully");
        form.reset();
        // console.log(res.data);
        router.push(`/channel/${data.username}`);
      }
    } catch (error: any) {
      console.log("unable to create channel:", error);
      toast.error(
        error?.response?.data.toString() ||
          error?.message ||
          "unable to create channel"
      );
    }
  };

  useEffect(() => {
    const checkUsernameExist = async (username: string) => {
      try {
        const res = await axios.get(`/api/youtube/channel/${username}/unique`);
        // if (res.status === 200) {

        // };
        console.log(res.data);
      } catch (error: any) {
        form.setError("username", {
          message: error?.response?.data || error?.response?.message,
        });
        toast.error(error?.response?.data || error.message || "Unknown error");
      }
    };
    const username = form.watch("username");
    if (username && username.length > 3) {
      // check username exist
      checkUsernameExist(username);
    }
  }, [form.watch("username")]);
  return (
    <div className="md:container mx-auto my-10 pl-[250px]">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Create Channel</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Channel Name</Label>
                      <Input {...field} placeholder="enter channel name" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Username</Label>
                      <Input {...field} placeholder="enter username" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Channel Email</Label>
                      <Input {...field} placeholder="enter channel email" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Channel Logo</Label>
                      <ImageUploadInput
                        src={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Channel Banner</Label>
                      <ImageUploadInput
                        src={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                onClick={() => onSubmit(form.getValues())}
                disabled={form.formState.isSubmitting}
                variant={"default"}
                type="submit"
                className="bg-green-500 my-5"
              >
                Create Channel
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateChannel;
