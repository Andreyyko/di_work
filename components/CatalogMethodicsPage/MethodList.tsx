"use client";

import MethodicsCard from "./MethodicsCard";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

export default function MethodsList() {
  return (
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] mx-auto pb-62.5 md:pb-62.5 relative">
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
        <h6 className="heading-bg absolute md:-top-10 lg:-top-14 xl:-top-20 hidden md:block">Be Unique</h6>
      </div>
      
    </section>
  );
}
