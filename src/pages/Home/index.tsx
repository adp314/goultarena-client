import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { FooterLayout } from "../../components/FooterLayout";

export function Home() {
  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-full border-r-2 border-l-2 border-[#111111] box-border">
            <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-[22%] bg-cover drop-shadow-md" />
            <div className="bg-[#181818] text-white font-KoHo flex flex-col justify-evenly h-full">
              <p className=" text-4xl px-24 py-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                iaculis imperdiet lectus, nec sagittis metus aliquet in. Donec
                tincidunt in turpis eget pulvinar. Nullam tellus arcu, imperdiet
                tempor mollis sed, venenatis ut quam. Praesent quis lacus
                sapien. Nullam euismod eleifend sem sed hendrerit. Fusce luctus
                suscipit quam et pellentesque. Donec consequat mattis pretium.
                Nunc eu pharetra sem. Ut pharetra elit eget nunc bibendum
                feugiat. Proin quis porttitor purus. Fusce tristique, lorem id
                finibus venenatis, tortor mauris suscipit nisi, eu mollis arcu
                nulla a enim. Aliquam erat volutpat. Integer vulputate interdum
                orci, nec rutrum neque. Lorem ipsm dolor sit amet, consectetur
                adipiscing elit. Vivamus iaculis imperdiet lectus, nec sagittis
                metus aliquet in. Donec tincidunt tortor mauri tortor mauris
                suscipit nisi, eu mollis arcu nulla a enim. Aliquam Lorem ipsum
                dolor sit amet, consectetur
              </p>
              <FooterLayout />
            </div>
          </div>
        </div>
      }
    />
  );
}
