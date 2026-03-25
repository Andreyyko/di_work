import { getMethodicsSectionsBySlug } from "@/constant/methodics-sections/getMethodicsSectionsBySlug";
import PhotoFrame from "@/components/common/PhotoFrame";
import FrameWrapper from "@/components/common/FrameWrapper";
import MethodicsSectionAccessGate from "@/components/common/MethodicsSectionAccessGate";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Link from "next/link";
import ContentProtection from "@/components/Protection/ContentProtection";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 20;

export default async function MethodicPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const methodic = await getMethodicsSectionsBySlug(category);

  console.log(
    "METHODICS SECTION DATA:",
    category,
    JSON.stringify(methodic, null, 2)
  );

  if (!methodic) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Методика не знайдена</h1>
        <p>category: {category}</p>
      </div>
    );
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedMethods = methodic.methods.slice(start, end);
  const totalPages = Math.ceil(methodic.methods.length / ITEMS_PER_PAGE);

  return (
    <MethodicsSectionAccessGate categorySlug={category}>
    <section className="px-5 flex flex-col items-center bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] overflow-hidden relative pb-10">
    <ContentProtection/>
      <div className="absolute flex flex-row justify-between items-center w-[98%] top-175 md:top-125">
        <h4 className="heading-4 text-left w-[50%] pt-10 md:w-[30%] hidden md:block">
          {methodic.subtitle}
        </h4>
        <Image
          src={white_letter.WHITE_POSTCARD}
          alt={"letter"}
          className="lg:w-80 translate-x-20 rotate-15 hidden lg:block"
        />
      </div>

      <h5 className="absolute heading-5 left-0 w-[20%]">
        Не важливо, як саме ти говориш — важливо, що твої думки мають значення.
      </h5>

      <h2 className="pt-34 heading-2 uppercase text-center w-[70%] first-letter hidden sm:block">
        {methodic.title}
      </h2>

      <h2 className="pt-34 heading-2 uppercase text-center w-[90%] tracking-[-0.05em] first-letter block sm:hidden">
        {methodic.mobtitle}
      </h2>

      {methodic.heroImage ? (
        <PhotoFrame
          src={methodic.heroImage.url}
          alt={methodic.heroImage.alt}
          letterVariant="large"
          mobileWidth={"90%"}
        />
      ) : (
        <PhotoFrame
          src={white_letter.WHITE_POSTCARD}
          alt="method section"
          letterVariant="none"
          mobileWidth={"90%"}
        />
      )}
      <h4 className="heading-4 text-left w-full pt-10 md:w-[30%] block md:hidden">
        {methodic.subtitle}
      </h4>
      <div className="pt-62 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedMethods.map((card: any) => (
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
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-4 pt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/methodics-sections/${category}?page=${i + 1}`}
              className={`px-4 py-3 rounded-3xl border heading-4 ${
                currentPage === i + 1
                  ? "bg-brand-bordo rounded-3xl text-white"
                  : ""
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </section>
    </MethodicsSectionAccessGate>
  );
}
