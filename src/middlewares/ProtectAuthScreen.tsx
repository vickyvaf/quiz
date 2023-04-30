import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectAuthScreen({ children }: Props): any {
  if (Cookies.get("quiz") === undefined) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
