import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import Icon from "@mui/material/Icon";
import Chat from "./layouts/chat/Chat";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/home",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Chat",
    key: "chat",
    icon: <Icon fontSize="small">chat_icon</Icon>,
    route: "/chat",
    component: <Chat />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;
