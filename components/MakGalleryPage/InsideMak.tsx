import FrameWrapper from "@/components/common/FrameWrapper";
import MakSectionTexts from "@/components/common/MakSectionTexts";
import { mak_gallery_images } from "@/public/images/MakGallery";

const InsideMak = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-50 pt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center lg:items-start">
        <div className="flex flex-col gap-0 lg:gap-65 w-full lg:w-[50%]">
          <MakSectionTexts
            title="Що всередині?"
            listmakinside={[
              "63 МАК картини (емоції, ресурси, казкові персонажі, ситуації з життя, символічні образи);",
              "На лицьовій стороні — ілюстрація;",
              "На звороті — короткий опис, терапевтичний ефект і запитання для роздумів.",
            ]}
          />
          <MakSectionTexts
            title="Чому «be unique»?"
            descriptionMak="Бо кожна людина має свій неповторний шлях, свої ресурси і власні відповіді. Ці карти створені, щоб допомогти побачити унікальність у собі й інших."
          />
        </div>
        <FrameWrapper
          src={mak_gallery_images.MOON_GIRL}
          imgWidth={430}
          paddingX={20}
          paddingY={40}
          className="h-fit w-[330px] lg:w-[430px]"
        />
      </div>
      <div className="w-full lg:w-[60%]">
        <h4 className="heading-4">
          Поєднує в собі підходи позитивної психотерапії, ресурсно-орієнтованих
          методів, арт-терапії та інших терапевтичних напрямків, які спрямовані
          на пошук сенсу та розвиток резилієнтності, зокрема:
        </h4>
        <br />
        <MakSectionTexts
          listmakinside={[
            "позитивну психотерапію (PPT);",
            "ресурсно-орієнтовану психотерапію;",
            "наративну терапію;",
            "сенс-орієнтовану терапію (логотерапію Франкла);",
            "підходи, спрямовані на розвиток резилієнтності;",
            "когнітивно-поведінкову терапію (КПТ);",
            "терапію прийняття та відповідальності (ACT);",
            "поведінкову активацію;",
            "методи розв’язання проблем (Problem-Solving Therapy);,",
            "майндфулнес-орієнтовані інтервенції (MBCT).",
          ]}
        />
        <h4 className="heading-4 ">
          Це дає можливість не лише усвідомити емоції й переживання через
          метафоричні образи, а й знайти опори, сенс і практичний шлях дії. Цей
          набір — цінний інструмент для психологів, коучів, освітян, а також для
          кожного, хто хоче рухатися від усвідомлення до конкретних кроків і
          змін.
        </h4>
      </div>
    </div>
  );
};

export default InsideMak;
