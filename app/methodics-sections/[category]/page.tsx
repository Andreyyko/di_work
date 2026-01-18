import { getMethodicsSectionsBySlug } from "@/constant/methodics-sections/getMethodicsSectionsBySlug";
import PhotoFrame from "@/components/common/PhotoFrame";
import FrameWrapper from "@/components/common/FrameWrapper";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function MethodicPage({ params }: PageProps) {
  const { category } = await params;

  const methodic = await getMethodicsSectionsBySlug(category);

  if (!methodic) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Методика не знайдена</h1>
        <p>category: {category}</p>
      </div>
    );
  }

  return (
    <section className="px-5 flex flex-col items-center bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] overflow-hidden relative pb-10">
      <div className="absolute flex flex-row justify-between items-center w-[98%] top-175 md:top-125">
        <h4 className="heading-4 text-left w-[50%] md:w-[20%]">
          Методики, що допомагають відновити діалог, довіру та спільну опору в
          стосунках
        </h4>
        <Image
          src={white_letter.WHITE_POSTCARD}
          alt={"letter"}
          className="lg:w-80 translate-x-20 rotate-15 hidden md:block"
        />
      </div>
      <h5 className="absolute heading-5 left-0 w-[20%]">
        Не важливо, як саме ти говориш — важливо, що твої думки мають значення.
      </h5>
      <h2 className="pt-34 heading-2 uppercase text-center w-[70%] first-letter">
        {methodic.title}
      </h2>

      <PhotoFrame src={methodic.heroImage.url} alt={methodic.heroImage.alt} />

      <div className="pt-62 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {methodic.cards.map((card) => (
          <Link
            key={card.id}
            href={`/methodics-sections/${category}/${card.slug}`}
            className="flex flex-col justify-center items-center group"
          >
            <FrameWrapper
              paddingY={60}
              paddingX={40}
              className="text-center flex-1 w-[90%] justify-center items-center flex"
            >
              <h3 className="heading-3 uppercase">{card.title}</h3>
            </FrameWrapper>

            <p className="pt-3 heading-6 text-center -tracking-wide">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
