import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useGetUserPublicData } from "../../lib/users";
import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { HomeTest } from "../../components/HomeTest";
import { useParams } from "react-router-dom";

// function getUserPublicData() {
//   return userData ? (
//     <div className="text-white">{userData?.userName}</div>
//   ) : (
//     <div className="text-white">Loading...</div>
//   );
// }

export function Home() {
  return (
    <GlobalLayout
      pageContainer={
        <>
          <div className="text-white">hello</div>
        </>
      }
    />
  );
}
