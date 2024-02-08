import UpdateProfile from "@/components/UpdateProfile";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/sign-in");

  return (
    <div>
      <UpdateProfileForm email={session?.user?.email!} />
    </div>
  );
};

export default Page;
