import FrameWrapper from "@/components/common/FrameWrapper";
import AuthorCol from "./AuthorCol";
import EffectComp from "./EffectComp";
import MakImages from "./ForWhatImages";
import InsideMak from "./InsideMak";
import Purpose from "./Purpose";
import { mak_gallery_images } from "@/public/images/MakGallery";
import MakPlan from "./MakPlan";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";

export default function MakGalleryPage() {
  return (
    <section className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] overflow-hidden">
      <h5 className="heading-5 -translate-x-5">
        Тренінги для відновлення
        <br />
        ресурсу — це не просто
        <br />
        практики, це повернення до
        <br />
        внутрішньої гармонії
      </h5>
      <h2 className="heading-2 uppercase text-center -tracking-widest pt-5">
        <span className="first-letter -tracking-widest" data-first-letter="У">
          нікальна авторська{" "}
          <span className="first-letter -tracking-widest" data-first-letter="З">
            бірка
          </span>
        </span>
        художніх рукотворних
        <span
          className="first-letter tracking-[-0.2em] lg:tracking-[-0.18em]"
          data-first-letter="М"
        >
          етафоричних асоціативних
        </span>{" "}
        картин, створена{" "}
        <span className="first-letter -tracking-widest" data-first-letter="Д">
          ля роботи з
        </span>{" "}
        емоціями, ресурсами й{" "}
        <span className="first-letter -tracking-widest" data-first-letter="В">
          нутрішнім світом{" "}
          <span className="first-letter" data-first-letter="Л">
            юдини
          </span>
        </span>
        <Image
          src={white_letter.WHITE_POSTCARD}
          alt="postcard"
          className="absolute left-[35%] w-[30%] z-50 rotate-10 hidden lg:block"
        />
      </h2>
      <MakImages />
      <AuthorCol />
      <InsideMak />
      <EffectComp />
      <Purpose />
      <FrameWrapper
        className="right-0 block lg:hidden mx-auto lg:mx-0"
        src={mak_gallery_images.BOOK_PREVIEW}
        width="330px"
        showOrnaments
        paddingX={20}
        paddingY={40}
      />
      <MakPlan />
    </section>
  );
}
