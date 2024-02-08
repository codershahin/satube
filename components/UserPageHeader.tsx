import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  username: string
};

interface ProfileCardProps {}

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Avatar>
            {/* <AvatarImage security=""/> */}
            <AvatarFallback>@Shahinadev</AvatarFallback>
        </Avatar>
      </div>
      <div className="max-w-[50px]">
        <h1>Options</h1>
      </div>
    </div>
  );
};

const UserPageHeader = ({username}: Props) => {
  return (
    <div className="safe_view">
     <ProfileCard />
     <h1 className="text-2xl">{username}</h1>
    </div>
  );
};

export default UserPageHeader;
