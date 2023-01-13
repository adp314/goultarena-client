import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillTrophy } from "react-icons/Ai";
import { IoMdStats } from "react-icons/Io";
import axios from "axios";

export function DirectoryPlayers() {
  let { userId } = useParams();
  const navigate = useNavigate();

  const [pageCount, setPageCount] = useState(1);

  const [directoryLoading, setDirectoryLoading] = useState(false);

  const [fetchedAllPlayersDirectory, setFetchedAllPlayersDirectory] = useState(
    []
  );

  function handlePageCount() {
    setPageCount(pageCount + 1);
  }
  console.log(pageCount);
  useEffect(() => {
    async function fetchUserData() {
      try {
        setDirectoryLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/directory/userfetch?page=${pageCount}`
        );
        setFetchedAllPlayersDirectory(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserData();
    setDirectoryLoading(false);
  }, []);

  return (
    <div className="font-KoHo uppercase">
      <ul className="border-2 rounded border-white border-opacity-20">
        {fetchedAllPlayersDirectory.length &&
          fetchedAllPlayersDirectory.map((user: any, index: number) => (
            <li
              className={`   ${
                index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"
              }`}
              key={user.userName}
              onClick={() => {
                navigate(`/user/view/${user._id}`);
              }}
            >
              <div className="flex justify-between gap-36 p-2">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded border-2 border-neutral-900 bg-no-repeat bg-cover drop-shadow-md cursor-pointer `}
                    style={{
                      backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${user.keyProfileImg})`,
                    }}
                  />
                  <p className="text-xl cursor-pointer hover:text-yellow-600">
                    {user.userName}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xl">
                  <div className="flex items-center">
                    <p>{user.playerPoints}</p>
                    <AiFillTrophy className="ml-2" />
                  </div>
                  <div className="h-[40%] w-0.5 bg-white rounded bg-opacity-30"></div>
                  <div className="flex text-xl items-center">
                    <IoMdStats className="mr-2" />
                    <div className="flex items-center gap-1">
                      <p className="text-blue-500">
                        {user.playerStats.totalWins}
                      </p>
                      <span>-</span>
                      <p className="text-gray-200">
                        {user.playerStats.totalDraws}
                      </p>
                      <span>-</span>
                      <p className="text-red-500">
                        {user.playerStats.totalLooses}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex justify-center items-center p-2">
        <button className="bg-white text-black" onClick={handlePageCount}>
          More...
        </button>
      </div>
    </div>
  );
}
