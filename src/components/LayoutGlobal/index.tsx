import "../../i18n";
import { NavLayout } from "../NavLayout";
import { BannerLayout } from "../BannerLayout";
import { FooterLayout } from "../FooterLayout";

export function GlobalLayout(props: any) {

  const { pageContainer } = props;

  return (
    <div className="flex">
      <NavLayout />
      <div className="flex flex-col w-full">
        <BannerLayout />
        {pageContainer}
        <FooterLayout />
      </div>
    </div>
  );
}
