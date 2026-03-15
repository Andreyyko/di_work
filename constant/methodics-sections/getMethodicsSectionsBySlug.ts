import { section_images_frame } from "@/public/images/CommonImages/SectionsImageFrame";

export async function getMethodicsSectionsBySlug(category: string) {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

  const res = await fetch(
    `${API_URL}/method-sections?filters[slug][$eq]=${encodeURIComponent(
      category
    )}&populate=methods`
  );

  if (!res.ok) {
    throw new Error("Failed to load method section");
  }

  const json = await res.json();
  const item = json.data?.[0];

  if (!item) {
    return null;
  }

  const attrs = item.attributes ?? item;

  const methodsRaw = attrs.methods?.data ?? attrs.methods ?? [];
  const methods = methodsRaw.map((m: any) => {
    const mAttrs = m.attributes ?? m;
    return {
      id: m.id,
      slug: mAttrs.slug,
      title: mAttrs.title,
    };
  });

  let localHeroImage: { url: string; alt: string } | null = null;

  switch (attrs.slug) {
    case "pscyho":
      localHeroImage = {
        url: section_images_frame.PSCYHO.src,
        alt: "Психоемоційна сфера та психічне здоровʼя",
      };
      break;
    case "family":
      localHeroImage = {
        url: section_images_frame.FAMILY_SECTION.src,
        alt: "Сімейні пари",
      };
      break;
    case "kids":
      localHeroImage = {
        url: section_images_frame.FOR_CHILD.src,
        alt: "Для дітей",
      };
      break;
    case "life":
      localHeroImage = {
        url: section_images_frame.RESOURSE_FOR_LIFE.src,
        alt: "Ресурси для життя",
      };
      break;
    case "communicate":
      localHeroImage = {
        url: section_images_frame.COMMUNICATE.src,
        alt: "Комунікація",
      };
      break;
    case "parents":
      localHeroImage = {
        url: section_images_frame.PARENTS.src,
        alt: "Усвідомлене батьківство",
      };
      break;
    case "uncommunicate":
      localHeroImage = {
        url: section_images_frame.UNCOMMUNICATE.src,
        alt: "Комунікація з порушенням мовлення",
      };
      break;
  }

  return {
    id: item.id,
    slug: attrs.slug,
    title: attrs.title,
    subtitle: attrs.subtitle,
    mobtitle: attrs.mobtitle,
    heroImage: localHeroImage,
    methods,
  };
}
