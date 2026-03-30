"use client";
import { useMemo, useState } from "react";
import { cards } from "@/constant/MakCardsData/cards";
import SearchBar from "@/components/MakCardsPage/SearchBar";
import CardGrid from "@/components/MakCardsPage/CardGrid";
import Tabs, { Tab } from "@/components/MakCardsPage/Tabs";
import { useFavorites } from "@/hooks/useFavorite";
import { Card } from "@/constant/MakCardsData/cards";
import CardModal from "@/components/MakCardsPage/CardModal";
import MakCardsAccessGate from "@/components/common/MakCardsAccessGate";
import InstructionContent from "@/components/MakCardsPage/InstructionContent";

export default function CardsPage() {
  return (
    <MakCardsAccessGate>
      <CardsPageContent />
    </MakCardsAccessGate>
  );
}

function CardsPageContent() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const favoritesHook = useFavorites();
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const filteredCards = useMemo(() => {
    if (tab === "instruction") return [];

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
        .includes(query.toLowerCase()),
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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Tabs active={tab} onChange={setTab} />
          {tab !== "instruction" && (
            <button
              onClick={drawRandom}
              className="heading-4 text-lg rounded-lg border-brand-bordo text-brand-gray cursor-pointer transition whitespace-nowrap w-full sm:w-auto"
            >
              Випадкова картка
            </button>
          )}
        </div>

        {tab !== "instruction" && <SearchBar onSearch={setQuery} />}
      </div>

      {tab === "instruction" ? (
        <div>
          <InstructionContent />
        </div>
      ) : (
        <CardGrid
          cards={filteredCards}
          favoritesHook={favoritesHook}
          setActiveCard={setActiveCard}
          isFavoritesPage={tab === "favorites"}
        />
      )}

      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </div>
  );
}
