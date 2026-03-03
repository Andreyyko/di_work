import Image from "next/image";
import { Card } from "@/constant/MakCardsData/cards";
import { Heart } from "lucide-react";
import FrameWrapper from "../common/FrameWrapper";

export default function CardItem({
  card,
  favoritesHook,
  onClick,
}: {
  card: Card;
  favoritesHook: {
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
  };
  onClick: () => void;
}) {
  const { toggleFavorite, isFavorite } = favoritesHook;

  return (
    <div
      onClick={onClick}
      className="relative bg-transparent text-center overflow-hidden cursor-pointer hover:scale-[1.02] transition"
    >
      <FrameWrapper paddingX={15} paddingY={20}>
        <Image
          src={card.frontImage}
          alt={card.title}
          width={400}
          height={500}
          className="w-full xl:h-[500px] h-[400px] object-cover"
        />
      </FrameWrapper>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(card.id);
        }}
        className="absolute z-100 top-8 right-8 text-xl cursor-pointer"
      >
        {isFavorite(card.id) ? (
          <Heart size={32} color="#ffffff" strokeWidth={1.25} fill="#67161f"/>
        ) : (
          <Heart size={32} color="#ffffff" strokeWidth={1.25} fill="#ffffff32"/>
        )}
      </button>

      <div className="p-3 heading-3 text-brand-bordo uppercase">
        <h3 className="">{card.title}</h3>
      </div>
    </div>
  );
}
