"use client";
import { useMemo, useState } from "react";
import { cards } from "@/constant/MakCardsData/cards";
import SearchBar from "@/components/MakCardsPage/SearchBar";
import CardGrid from "@/components/MakCardsPage/CardGrid";
import Tabs from "@/components/MakCardsPage/Tabs";
import { useFavorites } from "@/hooks/useFavorite";
import { Card } from "@/constant/MakCardsData/cards";
import CardModal from "@/components/MakCardsPage/CardModal";

type Tab = "all" | "favorites" | "child";

export default function CardsPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const favoritesHook = useFavorites();
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const filteredCards = useMemo(() => {
    let list = cards;

    if (tab === "favorites") {
      list = list.filter((card) => favoritesHook.favorites.includes(card.id));
    }

    if (tab === "child") {
      list = list.filter((card) => card.type === "child");
    }

    if (!query) return list;

    return list.filter((c) =>
      [c.title, c.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query, tab, favoritesHook.favorites]);

  const drawRandom = () => {
    if (!filteredCards.length) return;

    const random =
      filteredCards[Math.floor(Math.random() * filteredCards.length)];

    setActiveCard(random);
  };

  return (
    <div className="px-5 pt-35 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] relative overflow-hidden">
      <div className="flex flex-col justify-between sm:flex-row items-center gap-4 pb-6">
        <div className="flex flex-row gap-3">
          <Tabs active={tab} onChange={setTab} />
          <button
            onClick={drawRandom}
            className="heading-4 text-lg rounded-lg border-brand-bordo text-brand-gray cursor-pointer transition whitespace-nowrap"
          >
            Випадкова картка
          </button>
        </div>

        <SearchBar onSearch={setQuery} />
      </div>

      <CardGrid
        cards={filteredCards}
        favoritesHook={favoritesHook}
        setActiveCard={setActiveCard}
        isFavoritesPage={tab === "favorites"}
      />

      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </div>
  );
}
