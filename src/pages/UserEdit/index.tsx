import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";
import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import axios from "axios";

export function UserEdit() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [formUserEdit, setFormUserEdit] = useState({
    userName: "",
  });

  const userData = {
    query: {
      email: user?.email as string,
      userName: formUserEdit.userName as string,
    },
  };

  const [fetchedUserData, setFetchedUserData] = useState<
    Record<string, unknown>
  >({});

  // Get user data with a query param request via the mail

  useEffect(() => {
    async function fetchUserData() {
      const token = await getAccessTokenSilently();
      if (user && isAuthenticated === true && isLoading === false) {
        try {
          if (userData.query) {
            const fetchUserResponse = await axios.get(
              `http://localhost:4000/api/user/fetch?email=${userData.query.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setFetchedUserData(fetchUserResponse.data);
            console.log(
              `fetchUserData Response : ${[
                fetchedUserData.email,
                fetchedUserData.userName,
              ]}`
            );

            console.log(`fetchUserData req : ${userData.query.email}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserData();
  }, [user, isAuthenticated === true]);

  const save = async () => {
    try {
      const target = imageRef?.current;
      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await axios.get(
            "http://localhost:4000/api/uploadimg/postimg",
            {
              params: {
                key: "keyid",
              },
            }
          );

          const { post, key } = await response.data;

          const formData = new FormData();
          Object.entries({
            ...post.fields,
            file,
          }).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
          });

          await axios.post(post.url, formData);
          console.log(imageRef);
          console.log(file);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const urlImg = `https://goultarena-s3bucket.s3.eu-west-3.amazonaws.com/KROmadSWwSsJkvD_A3RJ9`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    try {
      const infosToSendForAPI = { ...formUserEdit };

      const response = await axios.put(
        `http://localhost:4000/api/user/edit?email=${userData.query.email}`,

        infosToSendForAPI
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormUserEdit({ ...formUserEdit, [e.target.name]: e.target.value });
  }
  console.log(formUserEdit.userName);
  return (
    <GlobalLayout
      pageContainer={
        <div>
          <div className="bg-neutral-900 w-full h-screen text-white font-KoHo flex flex-col justify-center items-center gap-6">
            <h1>UserEdit pageContainer</h1>
            <div className="bg-neutral-500 flex flex-col justify-center items-center">
              <div className="bg-black text-white">
                <input ref={imageRef} type="file" />
                <button onClick={() => save()}>save</button>
              </div>
              <img src={`${urlImg}`} className="w-20 h-20 " />

              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    @
                  </span>
                  <input
                    type="text"
                    id="username"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5 "
                    placeholder="Bonnie Green"
                    name="userName"
                    value={formUserEdit.userName}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="bg-black text-white">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <FooterLayout />
        </div>
      }
    />
  );
}
