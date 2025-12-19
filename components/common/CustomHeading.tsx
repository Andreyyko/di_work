import PhotoFrame from "./PhotoFrame";
import {
  headingPresets,
  HeadingPresetKey,
  HeadingPreset,
} from "../../constant/common/CustomHeadingPreset";

type CustomHeadingProps =
  | {
      preset: HeadingPresetKey;
      image?: never;
      line1?: never;
      line2?: never;
      line3?: never;
    }
  | {
      preset?: undefined;
      image: string;
      line1?: string;
      line2?: string;
      line3?: string;
      highlightWords1?: number[];
      highlightWords2?: number[];
      highlightWords3?: number[];
    };

function renderLine(
  text: string | undefined,
  highlight: number[] | undefined,
  align: "start" | "end"
) {
  if (!text) return null;

  const words = text.split(" ");

  return (
    <span className={`self-${align} flex flex-wrap gap-2`}>
      {words.map((word, idx) => {
        const isHighlighted = highlight?.includes(idx);

        return (
          <span
            key={idx}
            className={
              isHighlighted ? "first-letter uppercase -translate-y-1" : ""
            }
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

export default function CustomHeading(props: CustomHeadingProps) {
  const data: HeadingPreset | any = props.preset
    ? headingPresets[props.preset]
    : props;

  return (
    <div>
        <h5 className="-translate-x-5 heading-5">Відновлення довіри,<br/>покращення комунікації та<br/>гармонія у стосунках через<br/>спільне розуміння.</h5>
      <div className="w-full flex flex-col items-center justify-center text-center py-10">
        <PhotoFrame src={data.image} />

        <div className="mt-6 flex flex-col w-full heading-2 uppercase">
          {renderLine(data.line1, data.highlightWords1, "start")}
          {renderLine(data.line2, data.highlightWords2, "end")}
          {renderLine(data.line3, data.highlightWords3, "start")}
        </div>
      </div>
    </div>
  );
}
