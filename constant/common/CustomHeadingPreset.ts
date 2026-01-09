import { section_images_frame } from "@/public/images/CommonImages/SectionsImageFrame";
import { StaticImageData } from "next/image";

export type HeadingPresetKey =
  | "family"
  | "life"
  | "kids"
  | "communicate"
  | "pscyho"
  | "parents"
  | "uncommunicate";

export type HeadingData = {
  image: StaticImageData;
  subLineHeading: string;
  line1?: string;
  line2?: string;
  line3?: string;
  lineMob1?: string;
  lineMob2?: string;
  lineMob3?: string;
  lineMob4?: string;
  lineMob5?: string;
  lineMob6?: string;
  highlightWordsMob1?: number[];
  highlightWordsMob2?: number[];
  highlightWordsMob3?: number[];
  highlightWordsMob4?: number[];
  highlightWordsMob5?: number[];
  highlightWordsMob6?: number[];
  highlightWords1?: number[];
  highlightWords2?: number[];
  highlightWords3?: number[];
};

export const headingPresets: Record<HeadingPresetKey, HeadingData> = {
  family: {
    image: section_images_frame.FAMILY_SECTION,
    subLineHeading: "Відновлення довіри, покращення комунікації та гармонія у стосунках через спільне розуміння.",
    line1: "Для роботи із",
    line2: "сімейними парами",
    highlightWords1: [0],
    highlightWords2: [0, 1],
    lineMob1: "Для роботи із",
    lineMob2: "Cімейними",
    lineMob3: "Парами",
    highlightWordsMob1: [0],
    highlightWordsMob2: [0],
    highlightWordsMob3: [0],
  },

  life: {
    image: section_images_frame.RESOURSE_FOR_LIFE,
    subLineHeading: "Кожен із нас має внутрішнє джерело сили. Цей розділ допомагає відчути його пульс, повернути віру у власні можливості та знайти гармонію з собою.",
    line1: "Для пошуку ресурсів та",
    line2: "життєздатності,",
    line3: "мотивації та унікальності",
    highlightWords1: [0, 3],
    highlightWords2: [0],
    highlightWords3: [0],
    lineMob1: "Для пошуку",
    lineMob2: "ресурсів та",
    lineMob3: "життєздатності, ",
    lineMob4: "мотивації та",
    lineMob5: "унікальності",
    highlightWordsMob1: [0],
    highlightWordsMob2: [1],
    highlightWordsMob4: [0],
  },

  kids: {
    image: section_images_frame.FOR_CHILD,
    subLineHeading: "У кожній дитині спить талант, який прокидається від гри, кольору й уяви. Цей розділ допомагає розкрити творчість, навчає бачити красу в простих речах.",
    line1: "Для дітей на розвиток",
    line2: "творчих здібностей",
    highlightWords1: [0, 3],
    highlightWords2: [0],
    lineMob1: "Для дітей на",
    lineMob2: "розвиток",
    lineMob3: "творчих",
    lineMob4: "здібностей",
    highlightWordsMob1: [0],
    highlightWordsMob2: [0],
    highlightWordsMob3: [0],
  },

  communicate: {
    image: section_images_frame.COMMUNICATE,
    subLineHeading: "Коли дитині дозволяють мріяти, фантазувати й творити без обмежень — вона починає довіряти собі, світові й відчуває, що її думки мають значення.",
    line1: "Для розвитку комунікативних",
    line2: "навичок, психологічного",
    line3: "клімату та коучингу",
    highlightWords1: [0],
    highlightWords2: [0, 1],
    highlightWords3: [0],
    lineMob1: "Для розвитку",
    lineMob2: "комунікативних",
    lineMob3: "навичок,",
    lineMob4: "психологічного",
    lineMob5: "клімату",
    lineMob6: "та коучингу",
    highlightWordsMob1: [0],
    highlightWordsMob3: [0],
    highlightWordsMob4: [0],
    highlightWordsMob5: [0],
  },

  pscyho: {
    image: section_images_frame.PSCYHO,
    subLineHeading: "Психічне здоров’я починається там, де ми дозволяємо собі бути живими — відчувати, помилятися, змінюватися",
    line1: "Для покращення",
    line2: "психоемоційної",
    line3: "сфери та психічного здоров’я",
    highlightWords1: [0],
    highlightWords2: [0],
    highlightWords3: [2],
    lineMob1: "Дляпокращення",
    lineMob2: "психоемоційної",
    lineMob3: "сфери та",
    lineMob4: "психічного",
    lineMob5: "здоров’я",
    highlightWordsMob1: [0],
    highlightWordsMob2: [0],
    highlightWordsMob4: [0],
  },

  parents: {
    image: section_images_frame.PARENTS,
    subLineHeading: "Усвідомлене батьківство починається там, де з’являється діалог, довіра й любов без умов.",
    line1: "Методики усвідомленого",
    line2: "батьківства",
    highlightWords1: [0, 1],
    highlightWords2: [0],
    lineMob1: "Методики",
    lineMob2: "Усвідомленого",
    lineMob3: "Батьківства",
    highlightWordsMob1: [0],
    highlightWordsMob2: [0],
    highlightWordsMob3: [0],
  },

  uncommunicate: {
    image: section_images_frame.UNCOMMUNICATE,
    subLineHeading: "Не важливо, як саме ти говориш — важливо, що твої думки мають значення.",
    line1: "Для розвитку комунікативних",
    line2: "навичок осіб",
    line3: "з порушенням мовлення",
    highlightWords1: [0],
    highlightWords2: [0],
    highlightWords3: [1],
    lineMob1: "Для розвитку",
    lineMob2: "комунікативних",
    lineMob3: "навичок осіб",
    lineMob4: "з порушенням",
    lineMob5: "мовлення",
    highlightWordsMob1: [0],
    highlightWordsMob3: [0],
    highlightWordsMob4: [1],
  },
};
