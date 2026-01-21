"use client";

import MethodicsCard from "./MethodicsCard";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

export default function MethodsList() {
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
        {CategoriesFrThCarouselData.map((item) => (
          <MethodicsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
