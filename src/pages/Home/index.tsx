import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { apiGet, useGetUserData } from "../../lib/users";
import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { HomeTest } from "../../components/HomeTest";

function UserInfo() {
  const { data } = useGetUserData();
  return <div className="text-white">{data?.userName}</div>;
}

export function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  return <GlobalLayout pageContainer={<>{user && <UserInfo />}</>} />;
}
