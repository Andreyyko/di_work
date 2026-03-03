"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/constant/MakCardsData/cards";
import CardItem from "./CardItem";
import gsap from "gsap";

export default function CardGrid({
  cards,
  favoritesHook,
  setActiveCard,
  isFavoritesPage = false, 
}: {
  cards: Card[];
  favoritesHook: any;
  setActiveCard: (card: Card) => void;
  isFavoritesPage?: boolean; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cards.length > 0) {
        gsap.fromTo(
          ".card-anim",
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.7)",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [cards]);

  if (!cards.length) {
    return (
      <div className="heading-4 text-center opacity-70 py-40 px-10">
        {isFavoritesPage 
          ? "Ваш список улюблених поки порожній" 
          : "За вашим запитом нічого не знайдено"}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid gap-5 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((card) => (
        <div key={card.id} className="card-anim opacity-0">
          <CardItem
            card={card}
            favoritesHook={favoritesHook}
            onClick={() => setActiveCard(card)}
          />
        </div>
      ))}
    </div>
  );
}