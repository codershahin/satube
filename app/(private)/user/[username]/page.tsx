import UserPageHeader from "@/components/UserPageHeader";

type Props = {
  params: {
    username: string;
  };
};

const Page = ({ params: { username } }: Props) => {
  return (
    <div className="md:container safe_view mx-auto">
      {/* Header */}
      {/* @ts-ignore */}
      <UserPageHeader username={username} />
      {/* Main Area */}
      <div>
        <h1 className="text-2xl font-medium">Main Area</h1>
      </div>
    </div>
  );
};

export default Page;
