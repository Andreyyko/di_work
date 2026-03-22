import type { AuthUser } from "@/api/auth-api";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

/** Slugs розділів методик з каталогу (без МАК-пакету) */
export const METHODIC_SECTION_SLUGS: string[] = CategoriesFrThCarouselData.filter(
  (item) => (item as { isMakCards?: boolean }).isMakCards !== true
).map((item) => item.slug);

export function canAccessMethodicsCategory(
  categorySlug: string,
  me: AuthUser | null,
  ownedSectionSlugs: Set<string>
): boolean {
  if (!me) return false;
  if (me.isPremium === true) return true;
  if (me.isMedium === true && METHODIC_SECTION_SLUGS.includes(categorySlug)) {
    return true;
  }
  return ownedSectionSlugs.has(categorySlug);
}

/** Доступ до сторінки МАК-карток */
export function canAccessMakCards(
  me: AuthUser | null,
  makCardsFromMeEndpoint: boolean
): boolean {
  if (!me) return false;
  if (me.isPremium === true) return true;
  if (me.makCardsAccess === true) return true;
  if (makCardsFromMeEndpoint === true) return true;
  return false;
}
