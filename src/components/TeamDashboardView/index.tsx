import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUserDataByParams } from "../../lib/usersByParam";
import axios from "axios";

export function TeamDashboardView() {
  const [allPlayersPostuled, setAllPlayersPostuled] = useState([]);

  let { teamId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPlayersPostuled() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/team/postulationsfetch?teamid=${teamId}`
        );
        const data = await res.json();
        setAllPlayersPostuled(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllPlayersPostuled();
  }, []);

  // async function acceptPostulation() {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/api/team/accept_postulation?teamid=${teamId}`
  //     );
  //     const data = await res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function declinePostulation() {}

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-full mr-24 ml-24 border-r border-l border-white border-opacity-10 w-full">
        <div className="flex justify-center items-center border-t border-white border-opacity-10 py-16">
          <div className="flex justify-evenly w-full gap-28">
            <div className="flex flex-col">
              <h2 className="uppercase text-lg">postulations</h2>
              <div className="">
                <ul className="border-2 rounded border-white border-opacity-20">
                  {allPlayersPostuled.map((elements: any, index: number) => {
                    return (
                      <li
                        className={`   ${
                          index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"
                        }`}
                        key={elements}
                        // onClick={() => {
                        //   navigate(`/user/view/${elements._id}`);
                        // }}
                      >
                        <div className="flex justify-between gap-36 p-2">
                          <div className="flex items-center gap-4">
                            <p className="text-xl cursor-pointer hover:text-yellow-600">
                              {elements.userName}
                            </p>
                          </div>
                          <div className="flex gap-6">
                            <p
                              className="text-green-600 cursor-pointer"
                              onClick={async () => {
                                try {
                                  const res = await axios.put(
                                    `http://localhost:4000/api/team/acceptpostulation?userid=${elements._id}&teamid=${teamId}`
                                  );

                                  window.location.reload();
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            >
                              O
                            </p>
                            <p
                              className="text-red-600 cursor-pointer"
                              onClick={declinePostulation}
                            >
                              X
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex">
              <h2 className="uppercase text-lg">matchs</h2>
            </div>
            <div className="flex">
              <h2 className="uppercase text-lg">statistiques</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
