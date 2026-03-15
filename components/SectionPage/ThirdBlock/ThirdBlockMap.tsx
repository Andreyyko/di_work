import ThirdBlockFamily from "./ThirdBlockFamily";
import ThirdBlockLife from "./ThirdBlockLife";
import ThirdBlockKids from "./ThirdBlockKids";

import { TextImageBlockKey } from "@/constant/SectionsPage/ImageTextBlock";
import ThirdBlockCommunicate from "./ThirdBlockCommunicate";
import ThirdBlockPscyho from "./ThirdBlockPscyho";
import ThirdBlockParents from "./ThirdBlockParents";
import ThirdBlockUnCommunicate from "./ThirdBlockUnCommunicate";


export const thirdBlockMap: Partial<Record<TextImageBlockKey, React.FC>> = {
  family: ThirdBlockFamily,
  life: ThirdBlockLife,
  kids: ThirdBlockKids,
  communicate: ThirdBlockCommunicate,
  pscyho: ThirdBlockPscyho,
  parents: ThirdBlockParents,
  uncommunicate: ThirdBlockUnCommunicate
};
