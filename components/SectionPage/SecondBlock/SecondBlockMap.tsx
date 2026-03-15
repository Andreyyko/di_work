import SecondBlockFamily from "./SecondBlockFamily";
import SecondBlockLife from "./SecondBlockLife";
import SecondBlockKids from "./SecondBlockKids";

import { TextImageBlockKey } from "@/constant/SectionsPage/ImageTextBlock";
import SecondBlockCommunicate from "./SecondBlockCommunicate";
import SecondBlockPscyho from "./SecondBlockPscyho";
import SecondBlockParents from "./SecondBlockParents";
import SecondBlockUnCommunicate from "./SecondBlockUnCommunicate";


export const secondBlockMap: Partial<Record<TextImageBlockKey, React.FC>> = {
  family: SecondBlockFamily,
  life: SecondBlockLife,
  kids: SecondBlockKids,
  communicate: SecondBlockCommunicate,
  pscyho: SecondBlockPscyho,
  parents: SecondBlockParents,
  uncommunicate: SecondBlockUnCommunicate
};
