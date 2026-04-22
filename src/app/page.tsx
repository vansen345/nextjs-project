import Header from "@/lib/ui/home/header/header_home";
import HomePageScreen from "@/lib/ui/home/home_page_screen";

export default function Page() {
  return (
    <>
      <Header/>
      <section className="flex flex-col gap-6 place-content-center place-items-center grow relative max-lg:px-5 max-lg:py-8 max-lg:gap-4">
        <div className="bg-layer bg-layer-1" />
        <div className="bg-layer bg-layer-4" />
        <div className="bg-layer bg-layer-5" />
        <div className="bg-layer bg-layer-2" />
        <div className="bg-layer bg-layer-3" />
        <HomePageScreen />
      </section>
    </>
  );
}