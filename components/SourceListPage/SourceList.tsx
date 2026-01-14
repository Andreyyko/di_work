import { SOURCES } from "@/constant/SourceListConstant/Source";
import FrameWrapper from "../common/FrameWrapper";
import MakSectionTexts from "../common/MakSectionTexts";
import ListButton from "./ListButton";

const SourceList = () => {
  return (
    <div className="pt-37.5 lg:pt-73 flex lg:flex-row flex-col pb-20">
      <MakSectionTexts
        sourceList={SOURCES.map((item, i) => (
          <span key={i} className="block">
            {item.text}

            {item.linkParts && (
              <>
                <br />
                <a
                  href={item.linkParts.join("")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2600FF] underline break-all"
                >
                  {item.linkParts[0]}
                  <br className="hidden lg:block" />
                  {item.linkParts[1]}
                </a>
              </>
            )}
          </span>
        ))}
      />
      <ListButton variant="text"/>
    </div>
  );
};

export default SourceList;
