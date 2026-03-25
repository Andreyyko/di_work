import PremiumAudioGate from "@/components/audioPlayer/PremiumAudioGate";
import FrameWrapper from "@/components/common/FrameWrapper";
import MethodicsSectionAccessGate from "@/components/common/MethodicsSectionAccessGate";
import InfoBlock from "@/components/common/InfoBlock";
import ListBlock from "@/components/common/ListBlock";
import { getMethodicBySlug } from "@/constant/methodics-sections/getMethodicBySlug";
import { methodic_image } from "@/public/images/MethodicsListImage";
import { notFound } from "next/navigation";
import ContentProtection from "@/components/Protection/ContentProtection";

function blocksToPlainText(blocks: any[] | null | undefined): string {
  if (!blocks) return "";

  return blocks
    .map((block) =>
      Array.isArray(block?.children)
        ? block.children.map((child: any) => child?.text || "").join("")
        : ""
    )
    .join("\n\n")
    .trim();
}

function blocksToPlainTextArray(blocks: any[] | null | undefined): string[] {
  if (!blocks) return [];

  return blocks
    .flatMap((block) => {
      if (!block) return [];

      if (typeof block === "string") {
        return [block];
      }

      if (typeof (block as any).text === "string") {
        return [(block as any).text];
      }

      if (Array.isArray((block as any).children)) {
        const text = (block as any).children
          .map((child: any) => child?.text || "")
          .join("");
        return [text];
      }

      return [];
    })
    .map((text) => text.trim())
    .filter((text) => text.length > 0);
}

type PageProps = {
  params: Promise<{
    category: string;
    methodic: string;
  }>;
};

export default async function MethodicDetailPage({ params }: PageProps) {
  const { category, methodic } = await params;

  const data = await getMethodicBySlug(methodic);

  console.log("METHODIC DETAIL DATA:", JSON.stringify(data, null, 2));

  if (!data) notFound();

  const apiSectionSlug = (data.method_section as { slug?: string } | null | undefined)?.slug;
  const categoryForAccess = apiSectionSlug || category;

  return (
    <MethodicsSectionAccessGate categorySlug={categoryForAccess}>
    <section className="px-5 md:pt-50 pt-30 pb-20 overflow-hidden bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
    <ContentProtection/>
      <PremiumAudioGate/>
      <div className="flex flex-col items-center relative">
        <span className="heading-bg lg:leading-7 leading-5 whitespace-nowrap">
          by Bogdana Andreyko
        </span>
        <FrameWrapper
          className="text-center max-w-[1440px] w-full"
          paddingY={50}
          paddingBottom={-30}
          showOrnaments
        >
          <h2 className="heading-2 uppercase md:w-[90%] w-full first-letter md:tracking-normal -tracking-widest">
            {data.title}
          </h2>
        </FrameWrapper>
        <div className="pt-12.5">
          <FrameWrapper src={methodic_image.METHODIC_IMAGE} alt={"flower"} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between pt-20 gap-12.5 md:gap-0">
        <div className="flex flex-col w-full md:w-[35%] gap-12.5 md:gap-20">
          <InfoBlock title={"Автор / Джерело:"} children={data.author_source} />
          <InfoBlock
            title={"Психотерапевтичний напрям / Підхід:"}
            children={data.approach}
          />
          <InfoBlock
            title={"Вік / Цільова група:"}
            children={data.target_audience}
          />
          <InfoBlock title={"Мета:"} children={data.goal} />
          {data.purpose && (
          <InfoBlock
            title={"Призначення:"}
            children={blocksToPlainText(data.purpose)}
            className="w-full "
          />
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-12.5 md:gap-20">
        {data.therapeutic_effect && (
            <InfoBlock
              title="Терапевтичний ефект:"
              children={blocksToPlainText(data.therapeutic_effect)}
              className="w-full md:w-4/5"
            />
          )}
          {data.time && (
            <InfoBlock
              title="Час виконання:"
              children={data.time}
              className="w-full md:w-4/5"
            />
          )}
          {data.materials && (
            <InfoBlock
              title="Матеріали:"
              children={data.materials}
              className="w-full md:w-4/5"
            />
          )}
          {data.interpretation && (
            <InfoBlock
              title="Інтерпретація:"
              children={blocksToPlainText(data.interpretation)}
              className="w-full md:w-4/5"
            />
          )}
          {data.short_instruction && (
            <InfoBlock
              title="Інструкція коротка:"
              children={blocksToPlainText(data.short_instruction)}
              className="w-full md:w-4/5"
            />
          )}
          <InfoBlock
            title="Інструкція:"
            children={blocksToPlainText(data.instruction)}
          />
          {data.completion && (
            <InfoBlock
              title="Завершення:"
              children={blocksToPlainText(data.completion)}
              className="w-full"
            />
          )}
          <div className="flex flex-col gap-4">
            <h3 className="heading-3 uppercase">запитання до рефлексії:</h3>
            <ListBlock
              items={blocksToPlainTextArray(data.reflection_questions)}
            />
          </div>
        </div>
      </div>
    </section>
    </MethodicsSectionAccessGate>
  );
}
