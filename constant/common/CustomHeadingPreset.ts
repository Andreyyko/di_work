import { section_images_frame } from "@/public/images/CommonImages/SectionsImageFrame";
import { StaticImageData } from "next/image";

export const headingPresets = {
  family: {
    image: section_images_frame.FAMILY_SECTION,
    line1: "Для роботи із",
    line2: "сімейними парами",
    highlightWords1: [0],
    highlightWords2: [0,1],
  },
  life: {
    image: section_images_frame.RESOURSE_FOR_LIFE,
    line1: "Для пошуку ресурсів та",
    line2: "життєздатності,",
    line3: "мотивації та унікальності",
    highlightWords1: [0,3],
    highlightWords2: [0],
    highlightWords3: [0]
  },
  kids: {
    image: section_images_frame.FOR_CHILD,
    line1: "Для дітей на розвиток",
    line2: "творчих здібностей",
    highlightWords1: [0,3],
    highlightWords2: [0],
  },
  communicate: {
    image: section_images_frame.COMMUNICATE,
    line1: "Для розвитку комунікативних",
    line2: "навичок, психологічного",
    line3: "клімату та коучингу",
    highlightWords1: [0],
    highlightWords2: [0,1],
    highlightWords3: [0]
  },
  pscyho: {
    image: section_images_frame.PSCYHO,
    line1: "Для покращення ",
    line2: "психоемоційної",
    line3: "сфери та психічного здоров’я",
    highlightWords1: [0],
    highlightWords2: [0],
    highlightWords3: [2]
  },
  parents: {
    image: section_images_frame.PARENTS,
    line1: "Методики усвідомленого",
    line2: "батьківства",
    highlightWords1: [0,1],
    highlightWords2: [0],
  },
  uncommunicate: {
    image: section_images_frame.PARENTS,
    line1: "Для розвитку комунікативних",
    line2: "навичок осіб",
    line3: "з порушенням мовлення",
    highlightWords1: [0],
    highlightWords2: [0],
    highlightWords3: [1]
  },
};

export type HeadingPresetKey = keyof typeof headingPresets;

export type HeadingPreset = {
  image: string | StaticImageData;
  line1?: string;
  line2?: string;
  line3?: string;
  highlightWords1?: number[];
  highlightWords2?: number[];
  highlightWords3?: number[];
};
