import "../../i18n";
import { NavLayout } from "../NavLayout";

export function GlobalLayout(props: any) {
  const { pageContainer } = props;

  return (
    <div className="w-screen h-screen box-border">
      <div className="w-full h-full flex box-border">
        <NavLayout />

        <div className="flex flex-col w-full h-full box-border overflow-y-auto shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]">
          {pageContainer}
        </div>
      </div>
    </div>
  );
}
