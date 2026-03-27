"use client";

import { useEffect, useState } from "react";
import { SOURCES } from "@/constant/SourceListConstant/Source";
import MakSectionTexts from "../common/MakSectionTexts";
import ListButton from "./ListButton";
import { getJwt, getMe } from "@/api/auth-api";
import { getMyMethodSections } from "@/api/user-method-sections";

const SourceList = () => {
  const [hasPaidSection, setHasPaidSection] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const jwt = getJwt();

    if (!jwt) {
      setHasPaidSection(false);
      return;
    }

    Promise.allSettled([getMyMethodSections(), getMe()])
      .then(([sectionsResult, meResult]) => {
        if (cancelled) return;

        const hasAnySection =
          sectionsResult.status === "fulfilled" &&
          (sectionsResult.value.items?.length ?? 0) > 0;

        const hasTariffAccess =
          meResult.status === "fulfilled" &&
          (meResult.value.isMedium === true || meResult.value.isPremium === true);

        setHasPaidSection(hasAnySection || hasTariffAccess);
      })
      .catch(() => {
        if (!cancelled) setHasPaidSection(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
      <ListButton
        variant={hasPaidSection ? "image" : "text"}
        downloadHref="/rok-literature.docx"
      />
    </div>
  );
};

export default SourceList;
