import { notFound } from "next/navigation";
import CustomHeading from "@/components/common/CustomHeading";
import {
  headingPresets,
  HeadingPresetKey,
} from "@/constant/common/CustomHeadingPreset";
import ImageTextBlockSection from "@/components/SectionPage/ImageTextBlockSection/ImageTextBlockSection";
import { imageTextPresets } from "@/constant/SectionsPage/ImageTextBlock";
import { secondBlockMap } from "@/components/SectionPage/SecondBlock/SecondBlockMap";
import { thirdBlockMap } from "@/components/SectionPage/ThirdBlock/ThirdBlockMap";
import ContactForm from "@/components/MainPage/ContactFormSection/ContactForm";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const key = slug as HeadingPresetKey;

  const headingData = headingPresets[key];
  const TextImageBlockData = imageTextPresets[key];
  const SecondBlock = secondBlockMap[key];
  const ThirdBlock = thirdBlockMap[key];

  if (!headingData) {
    notFound();
  }

  return (
    <section className="overflow-hidden relative">
      <div className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] ">
        <CustomHeading {...headingData} />{" "}
      </div>
      <ImageTextBlockSection {...TextImageBlockData} />

      <div className="px-5 bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]">{SecondBlock && <SecondBlock />}</div>
      <div className="px-5 bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]">{ThirdBlock && <ThirdBlock />}</div>
      <div className=" px-5 bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]">
        <ContactForm />
      </div>
    </section>
  );
}
