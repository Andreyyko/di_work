"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import MethodicsCard from "@/components/CatalogMethodicsPage/MethodicsCard";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";
import {
  getMyMethodSections,
  MyMethodSectionsResponse,
} from "@/api/user-method-sections";

type SlugToIdMap = Record<string, number | undefined>;
type OwnedSlugsMap = Record<string, boolean | undefined>;

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function MethodsSwiper() {
  const [sectionsMap, setSectionsMap] = useState<SlugToIdMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [ownedSlugs, setOwnedSlugs] = useState<OwnedSlugsMap>({});
  const [hasMakAccess, setHasMakAccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${API_URL}/method-sections?pagination[pageSize]=100`)
      .then((res) => res.json())
      .then((json) => {
        const data = json?.data ?? [];

        type MethodSectionItem = {
          id: number | string;
          slug?: string;
        };

        const map: SlugToIdMap = {};

        for (const item of data as MethodSectionItem[]) {
          const slug = item.slug;
          const id = item.id;

          if (slug && (typeof id === "number" || typeof id === "string")) {
            map[slug] = typeof id === "string" ? parseInt(id, 10) : id;
          }
        }

        setSectionsMap(map);
      })
      .catch(() => {
        setSectionsMap({});
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;

    getMyMethodSections<{ slug?: string }>()
      .then((data: MyMethodSectionsResponse<{ slug?: string }>) => {
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
      })
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
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] mx-auto pb-80 md:pb-100 px-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1300: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {CategoriesFrThCarouselData.map((item) => {
          const manualId = (item as { methodSectionId?: number }).methodSectionId;
          const resolvedId = manualId ?? sectionsMap[item.slug];
          const isMakCards = (item as { isMakCards?: boolean }).isMakCards === true;
          const owned = isMakCards ? hasMakAccess : !!ownedSlugs[item.slug];

          return (
            <SwiperSlide key={item.id}>
              <MethodicsCard
                item={{ ...item, owned }}
                methodSectionId={resolvedId}
                isLoadingSectionId={isLoading}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
