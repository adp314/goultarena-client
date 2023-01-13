import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function DirectoryTeams() {
  //   let { userId } = useParams();
  //   const navigate = useNavigate();

  //   const [pageCount, setPageCount] = useState(1);

  //   const [fetchedUserData, setFetchedUserData] = useState([
  //     {
  //       userName: "",
  //       _id: "",
  //     },
  //   ]);

  //   function handlePageCount(e: any) {
  //     e.preventdefault();
  //     setPageCount(pageCount + 1);
  //     console.log(pageCount);
  //   }

  //   useEffect(() => {
  //     async function fetchUserData() {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:4000/api/directory/userfetch?page=${pageCount}`
  //         );
  //         setFetchedUserData(res.data);
  //         console.log(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchUserData();
  //   }, []);

  return (
    <div className="bg-gray-500">
      <h1>team directory component</h1>
    </div>
  );
}
