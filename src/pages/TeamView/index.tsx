import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useGetTeamDataByParams } from "../../lib/teamsByParam";
import { useGetUserDataWithTokenCheck } from "../../lib/usersWithCheck";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export function TeamView() {
  let { userId, teamId } = useParams();
  const inputCodeRef = useRef<HTMLInputElement | null>(null);
  const { data: teamData } = useGetTeamDataByParams(teamId);
  const { data: userData } = useGetUserDataWithTokenCheck();

  function handleCodeSubmit() {
    const secretCode = inputCodeRef?.current;
    let postulationRequest = {
      teamId: teamData._id,
      userId: userData._id,
      secretCode: secretCode,
    };
    async function sendPostulation() {
      try {
        const res = await axios.post(
          "api/team/postulation",
          postulationRequest
        );
        //window.location.reload();
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
                        ref={inputCodeRef}
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
