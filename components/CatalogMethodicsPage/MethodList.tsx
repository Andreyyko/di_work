"use client";

import { useEffect, useState } from "react";
import MethodicsCard from "./MethodicsCard";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import {
  getMyMethodSections,
  MyMethodSectionsResponse,
} from "@/api/user-method-sections";

type SlugToIdMap = Record<string, number | undefined>;
type OwnedSlugsMap = Record<string, boolean | undefined>;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export default function MethodsList() {
  const [sectionsMap, setSectionsMap] = useState<SlugToIdMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [ownedSlugs, setOwnedSlugs] = useState<OwnedSlugsMap>({});
  const [hasMakAccess, setHasMakAccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const url = `${API_URL}/method-sections?pagination[pageSize]=100`;
    console.log("[MethodsList] GET method-sections URL:", url);

    fetch(url)
      .then((res) => {
        console.log("[MethodsList] method-sections response status:", res.status, res.statusText);
        return res.json();
      })
      .then((json) => {
        console.log(
          "[MethodsList] method-sections raw response:",
          JSON.stringify(json, null, 2)
        );

        const data = json?.data ?? [];
        console.log(
          "[MethodsList] method-sections data array length:",
          data.length
        );
        if (data.length > 0) {
          console.log("[MethodsList] first item keys:", Object.keys(data[0]));
          console.log("[MethodsList] first item sample:", data[0]);
        }

        type MethodSectionItem = {
          id: number | string;
          slug?: string;
        };

        const map: SlugToIdMap = {};

        for (const item of data as MethodSectionItem[]) {
          const slug = item.slug;
          const id = item.id;
          console.log("[MethodsList] item id:", id, "slug:", slug);

          if (slug && (typeof id === "number" || typeof id === "string")) {
            map[slug] = typeof id === "string" ? parseInt(id, 10) : id;
          }
        }

        console.log("[MethodsList] slug -> id map:", map);
        setSectionsMap(map);
      })
      .catch((err) => {
        console.error("[MethodsList] method-sections fetch error:", err);
        setSectionsMap({});
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Завантажуємо, які розділи вже є у користувача + доступ до МАК-карток
  useEffect(() => {
    let cancelled = false;

    getMyMethodSections<{ slug?: string }>()
      .then(
        (data: MyMethodSectionsResponse<{ slug?: string }>) => {
          if (cancelled) return;
          const map: OwnedSlugsMap = {};
          for (const rel of data.items || []) {
            const slug = rel.method_section?.slug;
            if (slug) {
              map[slug] = true;
            }
          }
          setOwnedSlugs(map);
          setHasMakAccess(data.makCardsAccess === true);
        }
      )
      .catch(() => {
        if (cancelled) return;
        setOwnedSlugs({});
        setHasMakAccess(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] mx-auto pb-62.5 md:pb-62.5 relative flex flex-col">
      <span className="heading-bg md:inline-flex md:leading-[25px] hidden">
        Be Unique
      </span>
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-10
        "
      >
        {CategoriesFrThCarouselData.map((item) => {
          const manualId = (item as { methodSectionId?: number }).methodSectionId;
          const resolvedId = manualId ?? sectionsMap[item.slug];
          const isMakCards = (item as { isMakCards?: boolean }).isMakCards === true;
          const owned = isMakCards
            ? hasMakAccess
            : !!ownedSlugs[item.slug];

          return (
            <MethodicsCard
              key={item.id}
              item={{ ...item, owned }}
              methodSectionId={resolvedId}
              isLoadingSectionId={isLoading}
            />
          );
        })}
      </div>
    </section>
  );
}
