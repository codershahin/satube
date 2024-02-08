import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: {
    channel: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  const channel = await db.channel.findFirst({
    where: {
      username: params.channel,
    },
  });
  if (!channel) {
    return redirect("/404");
  }
  return <div className="md:container mx-auto">{children}</div>;
};

export default Layout;
