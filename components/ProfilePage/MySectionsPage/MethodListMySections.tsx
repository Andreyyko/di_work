"use client";

import MethodicsCard from "./MethodicsCardMySections";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

export default function MethodsListProfile() {
  return (
    <section className="w-full max-w-[360px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1050px] xl:max-w-[1300px] ml-auto pb-62.5 relative">
      <div className="w-full flex justify-center lg:justify-end">
        <div className="flex flex-col items-center lg:items-start gap-5 w-full lg:w-[71%]">
          <h2 className="first-letter heading-2 uppercase">Мої розділи</h2>
          <h4 className="heading-4 w-full lg:w-[85%]">
            Тут відображені всі методики та тренінги, які ви придбали. Ви можете
            переглядати їх, проходити вправи та завдання, а також отримувати
            сертифікати після завершення.
          </h4>
          <hr className="w-full pb-8" />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row flex-wrap gap-10 justify-center md:justify-end">
        {CategoriesFrThCarouselData.map((item) => (
          <div key={item.id} className="w-full lg:w-[calc(35%-10px)]">
            <MethodicsCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
