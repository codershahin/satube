import { Grid, Settings, User, Users, Video } from "lucide-react";

export const adminMenus = [
  {
    id: 1,
    name: "Manage users",
    href: "manage-users",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    id: 2,
    name: "Manage videos",
    href: "manage-videos",
    icon: <Video className="mr-2 h-4 w-4" />,
  },
  {
    id: 3,
    name: "Manage Categories",
    href: "manage-categories",
    icon: <Grid className="mr-2 h-4 w-4" />,
  },
  {
    id: 4,
    name: "Settings",
    href: "settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];
