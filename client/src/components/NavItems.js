import * as Icons from "react-icons/fa";
import DirectionsCar from "@material-ui/icons/DirectionsCar"

export const navItems = [
  
  {
    id: 1,
    title: "Home",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  {
    id: 2,
    title: "Register Vehicle",
    path: "./register",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: < DirectionsCar/>,
  },
  
  {
    id: 3,
    title: "Forget Password",
    path: "./forget_password",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: < Icons.FaRegIdBadge />,
  },
  {
    id: 4,
    title: "Premium",
    path: "./premium",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaShoppingCart />,
  },
  {
    id: 5,
    title: "Sign-In",
    path: "./signup",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaUserAlt />,
  },
  {
    id: 5,
    title: "Profile",
    path: "./profile",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaUserAlt />,
  },
];
