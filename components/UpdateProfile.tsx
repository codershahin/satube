"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

interface UpdateProfileProps {
  user: User;
}

const UpdateProfile = ({ user }: UpdateProfileProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null | undefined>(null);
  const [bio, setBio] = useState<string | null | undefined>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      //   send data to api
      await axios.put("/api/profile", {
        username,
        bio,
      });
      toast({
        className: "bg-green-500 text-white",
        title: "Success.",
        description: "Profile has been updated successfully!",
      });
    } catch (error) {
      toast({
        className: "bg-red-500 text-white",
        title: "Sometin went wring.",
        description: "Unable to update profile!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setBio(user?.bio);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card>
        <CardHeader>
          <CardTitle>Update profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-base">Username</label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                placeholder={session?.user?.username!}
                value={username!}
              />
            </div>

            <div className="grid">
              <label className="text-base">Bio</label>
              <Input
                onChange={(e) => setBio(e.target.value)}
                placeholder={session?.user?.bio!}
                value={bio!}
              />
            </div>

            <Button variant={"destructive"} disabled={loading}>
              {loading ? "Update..." : "Update"}{" "}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
