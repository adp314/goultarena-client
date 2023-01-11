import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { FooterLayout } from "../../components/FooterLayout";

export function UserView() {
  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-full border-r-2 border-l-2 border-[#111111] box-border">
            <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-[22%] bg-cover drop-shadow-md" />
            <div className="bg-[#181818] text-white font-KoHo flex flex-col justify-evenly h-full">
              <p className=" text-4xl px-24 py-8">hello user view</p>
              <FooterLayout />
            </div>
          </div>
        </div>
      }
    />
  );
}
