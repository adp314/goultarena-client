import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";
import { useRef } from "react";

import axios from "axios";

export function UserTest() {
  const { user } = useAuth0();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const save = async () => {
    try {
      const target = imageRef?.current;
      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await axios.get(
            "http://localhost:4000/api/uploadimg/postimg"
          );

          const { post, key } = await response.data.json();

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

  return (
    <GlobalLayout
      pageContainer={
        <div>
          <div className="bg-neutral-900 w-full h-screen text-white font-KoHo flex flex-col justify-center items-center gap-6">
            <h1>UserTest pageContainer</h1>
            <div className="">
              <img
                src={user?.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </div>
            <div className="col-md text-center text-md-left">
              <h2>{user?.name}</h2>
              <p className="lead text-muted">{user?.email}</p>
            </div>

            <div className="col-md text-center text-md-left"></div>
            <div>
              <pre className="text-white">{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div className="bg-neutral-500 flex flex-col justify-center items-center">
              <div className="bg-black text-white">
                <input ref={imageRef} type="file" />
                <button onClick={() => save()}>save</button>
              </div>
            </div>
          </div>
          <FooterLayout />
        </div>
      }
    />
  );
}
