import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function TeamDashboardView() {
  const [allPlayersPostuled, setAllPlayersPostuled] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPlayersPostuled() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/team/postulationsfetch`
        );
        const data = await res.json();
        setAllPlayersPostuled(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllPlayersPostuled();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-full mr-24 ml-24 border-r border-l border-white border-opacity-10 w-full">
        <div className="flex justify-center items-center border-t border-white border-opacity-10 py-16">
          <div className="flex justify-evenly w-full gap-28">
            <div className="flex flex-col">
              <h2 className="uppercase text-lg">postulations</h2>
              <div className="">
                <ul className="border-2 rounded border-white border-opacity-20">
                  {allPlayersPostuled.map((user: any, index: number) => (
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
                            className={`w-10 h-10 rounded border-2 border-neutral-900 bg-no-repeat bg-cover drop-shadow-md cursor-pointer `}
                            style={{
                              backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${user.keyProfileImg})`,
                            }}
                          />
                          <p className="text-xl cursor-pointer hover:text-yellow-600">
                            {user.userName}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
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
