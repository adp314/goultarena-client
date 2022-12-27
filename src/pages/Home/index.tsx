import { GlobalLayout } from "../../components/LayoutGlobal/index";

export function Home() {
  return (
    <GlobalLayout
      pageContainer={
        <div className="bg-neutral-800 w-full h-screen text-white font-KoHo">
          <p>Home pageContainer</p>
        </div>
      }
    />
  );
}
