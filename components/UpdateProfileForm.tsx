"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputLoading from "./InputLoading";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  username: z.string().min(2).max(15),
  bio: z.string().min(2).max(50),
});

interface UpdateFormProps {
  email: string;
}

export function UpdateProfileForm({ email }: UpdateFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFetcing, setIsFetching] = useState(true);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      setIsFetching(true);
      const { data } = await axios.get(`/api/profile`);
      setIsFetching(false);
      return {
        username: data?.username?.toLowerCase(),
        bio: data?.bio,
      };
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      await axios.put("/api/profile", {
        username: values.username.toLocaleLowerCase(),
        bio: values.bio,
      });
      toast({
        className: "bg-green-500 text-white",
        title: "Success.",
        description: "Profile has been updated successfully!",
      });
      router.push("/");
    } catch (error) {
      toast({
        className: "bg-red-500 text-white",
        title: "Someting went wrong!",
        description:
          "The username you entred is already taken! please use another username and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto my-20">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    {isFetcing ? (
                      <InputLoading />
                    ) : (
                      <Input placeholder="username" {...field} />
                    )}
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    {isFetcing ? (
                      <InputLoading />
                    ) : (
                      <Input placeholder="bio" {...field} />
                    )}
                  </FormControl>
                  <FormDescription>
                    This is your public display bio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button disabled className="disabled:bg-gray-200 text-slate-900">
                Submit...
              </Button>
            ) : isFetcing ? (
              <Skeleton className="w-[100px] h-7 rounded-md" />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
