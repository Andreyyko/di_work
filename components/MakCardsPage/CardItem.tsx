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
      className="relative w-full bg-transparent text-center overflow-hidden cursor-pointer hover:scale-[1.02] transition duration-300"
    >
      <FrameWrapper paddingX={15} paddingY={20}>
        <div className="relative aspect-4/5 w-full overflow-hidden">
          <Image
            src={card.frontImage}
            alt={card.title}
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
            className="object-cover"
            priority={false}
          />
        </div>
      </FrameWrapper>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(card.id);
        }}
        className="absolute z-10 top-[7%] right-[10%] cursor-pointer drop-shadow-md"
      >
        <Heart 
          size={32} 
          color="#ffffff" 
          strokeWidth={1.25} 
          fill={isFavorite(card.id) ? "#67161f" : "#ffffff32"}
          className="transition-colors duration-300"
        />
      </button>

      <div className="p-3 heading-3 text-brand-bordo uppercase">
        <h3 className="text-sm md:text-base lg:text-lg xl:text-xl truncate">{card.title}</h3>
      </div>
    </div>
  );
}