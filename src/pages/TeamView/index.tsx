import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useGetTeamDataByParams } from "../../lib/teamsByParam";
import { useGetUserDataWithTokenCheck } from "../../lib/usersWithCheck";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export function TeamView() {
  let { userId, teamId } = useParams();
  const [inputCode, setInputCode] = useState({ inputCode: "" });
  const { data: teamData } = useGetTeamDataByParams(teamId);
  const { data: userData } = useGetUserDataWithTokenCheck();

  function handleChange(e: any) {
    e.preventDefault();
    setInputCode({ ...inputCode, [e.target.name]: e.target.value });
  }
  function handleCodeSubmit() {
    let postulationRequest = {
      teamId: teamData._id,
      userId: userData._id,
      secretCode: inputCode.inputCode,
    };
    console.log(inputCode);

    async function sendPostulation() {
      try {
        const res = await axios.put(
          "http://localhost:4000/api/team/postulation",
          postulationRequest
        );
        console.log(inputCode);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    sendPostulation();
  }

  return (
    <GlobalLayout
      pageContainer={
        teamData && (
          <>
            <div className="w-full h-full flex justify-center">
              <div className="flex flex-col w-5/6 h-max box-shadow-md ">
                <div className="drop-shadow-md">
                  <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
                </div>
                <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
                  <h1>
                    team view page of {teamData.teamName} with id: {teamId}{" "}
                  </h1>

                  <div>
                    <form>
                      <input
                        className="text-black"
                        type="text"
                        name="inputCode"
                        onChange={handleChange}
                      />
                      <button
                        className="text-white bg-green-800 ml-4"
                        onClick={handleCodeSubmit}
                      >
                        submit postulation
                      </button>
                    </form>
                  </div>
                </section>
                <FooterLayout />
              </div>
            </div>
          </>
        )
      }
    />
  );
}
