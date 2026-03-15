import PhotoFrame from "./PhotoFrame";
import { HeadingData } from "@/constant/common/CustomHeadingPreset";

function renderLine(
  text?: string,
  highlight?: number[],
  align: "start" | "end" = "start"
) {
  if (!text) return null;

  return (
    <span className={`justify-${align} flex flex-wrap gap-2 -tracking-widest`}>
      {text.split(" ").map((word, idx) => (
        <span
          key={idx}
          className={
            highlight?.includes(idx)
              ? "first-letter uppercase -translate-y-1"
              : ""
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
}

function renderLineMob(
  text?: string,
  highlight?: number[],
  align: "start" | "end" = "start"
) {
  if (!text) return null;

  return (
    <span className={`justify-${align} flex flex-wrap gap-2 -tracking-widest`}>
      {text.split(" ").map((word, idx) => (
        <span
          key={idx}
          className={
            highlight?.includes(idx)
              ? "first-letter uppercase translate-y-0.5"
              : ""
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
}

type CustomHeadingProps = HeadingData;

export default function CustomHeading({
  image,
  line1,
  line2,
  line3,
  highlightWords1,
  highlightWords2,
  highlightWords3,
  lineMob1,
  lineMob2,
  lineMob3,
  lineMob4,
  lineMob5,
  lineMob6,
  highlightWordsMob1,
  highlightWordsMob2,
  highlightWordsMob3,
  highlightWordsMob4,
  highlightWordsMob5,
  highlightWordsMob6,
  subLineHeading
}: CustomHeadingProps) {
  return (
    <div>
      <h5 className="absolute translate-x-0 heading-5 w-[50%] lg:w-[21%] md:w-[35%] lg:left-0 lg:text-left text-right right-0">
        {subLineHeading}
      </h5>

      <div className="w-full flex flex-col lg:pt-30 pt-20 items-center justify-center text-center pb-10">
        <PhotoFrame src={image} />

        <div className="pt-6 md:flex flex-col w-full heading-2 uppercase hidden">
          {renderLine(line1, highlightWords1, "start")}
          {renderLine(line2, highlightWords2, "end")}
          {renderLine(line3, highlightWords3, "start")}
        </div>
        <div className="pt-6 flex md:hidden flex-col w-full heading-2 uppercase text-4xl">
          {renderLineMob(lineMob1, highlightWordsMob1, "start")}
          {renderLineMob(lineMob2, highlightWordsMob2, "end")}
          {renderLineMob(lineMob3, highlightWordsMob3, "end")}
          {renderLineMob(lineMob4, highlightWordsMob4, "start")}
          {renderLineMob(lineMob5, highlightWordsMob5, "end")}
          {renderLineMob(lineMob6, highlightWordsMob6, "start")}
        </div>
      </div>
    </div>
  );
}
