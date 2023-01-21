import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AiFillTrophy } from "react-icons/Ai";
import { RiMoreFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdStats } from "react-icons/Io";

export function DirectoryPlayers() {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(1);
  const [directoryLoading, setDirectoryLoading] = useState(false);
  const [fetchedAllPlayersDirectory, setFetchedAllPlayersDirectory] = useState(
    []
  );
  const [filteredPlayersInput, setFilteredPlayersInput] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setDirectoryLoading(true);
        const res = await fetch(
          `http://localhost:4000/api/directory/usersfetch?page=${pageCount}`
        );
        const data = await res.json();
        setFetchedAllPlayersDirectory(data);
        setFilteredPlayersInput(data);
        
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserData();
    setDirectoryLoading(false);
  }, []);

  function handleSearchInput(e: any) {
    const filteredPlayersInput = fetchedAllPlayersDirectory.filter(
      (player: any) =>
        player.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPlayersInput(filteredPlayersInput);
  }

  function handlePageCount() {
    setPageCount(pageCount + 1);
  }

  return (
    <div className="font-KoHo uppercase flex flex-col items-center gap-6">
      <div className="flex items-center justify-start gap-2">
        <form className="flex gap-2 items-center justify-start">
          <FaSearch className="text-xl mr-1"/>
          <input
            type="text"
            placeholder="Search Players..."
            className="rounded text-black p-1"
            onChange={handleSearchInput}
          />
        </form>
      </div>
      <ul className="border-2 rounded border-white border-opacity-20">
        {filteredPlayersInput.map((user: any, index: number) => (
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
        <button
          className="bg-neutral-700 text-white rounded px-3 border border-white border-opacity-20"
          onClick={handlePageCount}
        >
          <RiMoreFill className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
