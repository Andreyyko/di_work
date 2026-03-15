"use client";

import { useEffect, useMemo, useState } from "react";
import MethodicsCard from "./MethodicsCardMySections";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import {
  UserMethodSectionRelation,
  getMyMethodSections,
} from "@/api/user-method-sections";

type MethodCardType = (typeof CategoriesFrThCarouselData)[number];

type MethodSectionFromApi = {
  id?: number;
  slug?: string;
  title?: string;
  // дозволяємо додаткові плоскі поля без any
  [key: string]: string | number | boolean | null | undefined;
};

export default function MethodsListProfile() {
  const [relations, setRelations] = useState<
    UserMethodSectionRelation<MethodSectionFromApi>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const catalogBySlug = useMemo(() => {
    const map: Record<string, MethodCardType> = {};
    for (const item of CategoriesFrThCarouselData) {
      map[item.slug] = item;
    }
    return map;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getMyMethodSections<MethodSectionFromApi>()
      .then((data) => {
        if (cancelled) return;
        console.log(
          "[MySections] /user-method-sections/me raw response:",
          JSON.stringify(data, null, 2)
        );
        setRelations(data || []);
      })
      .catch((err) => {
        if (cancelled) return;
        const msg =
          err instanceof Error
            ? err.message
            : "Не вдалося завантажити ваші розділи";
        setError(msg);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleItems: MethodCardType[] = useMemo(() => {
    const items: MethodCardType[] = [];

    for (const rel of relations) {
      const section = rel.method_section;
      const slug = section?.slug;
      console.log("[MySections] relation -> slug:", {
        relation: rel,
        section,
        slug,
      });
      if (!slug) continue;

      const meta = catalogBySlug[slug];
      console.log("[MySections] slug -> meta:", slug, meta);
      if (!meta) continue;

      items.push(meta);
    }

    return items;
  }, [relations, catalogBySlug]);

  return (
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] ml-auto pb-62.5 relative">
      <div className="w-full flex justify-center lg:justify-end">
        <div className="flex flex-col items-center lg:items-start gap-5 w-full lg:w-[71%]">
          <h2 className="first-letter heading-2 uppercase">Мої розділи</h2>
          <h4 className="heading-4 w-full lg:w-[85%]">
            Тут відображені всі методичні розділи, які ви вже придбали. Ви
            можете переходити до роботи з методиками в межах кожного розділу.
          </h4>
          <hr className="w-full pb-8" />
        </div>
      </div>

      {isLoading && (
        <p className="heading-6 text-center lg:text-right pt-4">
          Завантажуємо ваші розділи...
        </p>
      )}

      {error && !isLoading && (
        <p className="heading-6 text-center lg:text-right pt-4 text-red-500">
          {error}
        </p>
      )}

      {!isLoading && !error && visibleItems.length === 0 && (
        <p className="heading-6 text-center lg:text-right pt-4">
          У вас ще немає придбаних розділів. Поверніться до каталогу, щоб
          придбати перший розділ.
        </p>
      )}

      {visibleItems.length > 0 && (
        <div className="w-full flex flex-col lg:flex-row flex-wrap gap-10 justify-center md:justify-end pt-8">
          {visibleItems.map((item) => (
            <div key={item.id} className="w-full lg:w-[calc(35%-10px)]">
              <MethodicsCard item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
