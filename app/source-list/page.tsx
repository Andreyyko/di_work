import HeroSection from "@/components/SourceListPage/HeroSection";
import SourceList from "@/components/SourceListPage/SourceList";

export default function SourceListPage() {
  return (
    <section className="px-5 overflow-hidden bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <h5 className="heading-5 w-40 lg:w-80 -translate-x-5">
        Кожна книга — це маленьке джерело знань, що відкриває нові горизонти для
        розвитку та самопізнання.
      </h5>
      <HeroSection />
      <SourceList />
    </section>
  );
}
