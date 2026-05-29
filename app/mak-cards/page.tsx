"use client";

import { useMemo } from "react";
import { cards } from "@/constant/MakCardsData/cards";
import SearchBar from "@/components/MakCardsPage/SearchBar";
import CardGrid from "@/components/MakCardsPage/CardGrid";
import Tabs, { Tab } from "@/components/MakCardsPage/Tabs";
import { useFavorites } from "@/hooks/useFavorite";
import { Card } from "@/constant/MakCardsData/cards";
import CardModal from "@/components/MakCardsPage/CardModal";
import MakCardsAccessGate from "@/components/common/MakCardsAccessGate";
import InstructionContent from "@/components/MakCardsPage/InstructionContent";
import { withAccessGate } from "@/lib/with-access-gate";
import {
  useMakCardsTab,
  useMakCardsQuery,
  useMakCardsActiveId,
  useMakCardsUiStore,
} from "@/stores/mak-cards-ui-store";

function CardsPageContent() {
  const tab = useMakCardsTab();
  const query = useMakCardsQuery();
  const activeCardId = useMakCardsActiveId();
  const setTab = useMakCardsUiStore((s) => s.setTab);
  const setQuery = useMakCardsUiStore((s) => s.setQuery);
  const openCard = useMakCardsUiStore((s) => s.openCard);
  const closeCard = useMakCardsUiStore((s) => s.closeCard);

  const favoritesHook = useFavorites();

  const activeCard = useMemo(
    () => (activeCardId ? cards.find((c) => c.id === activeCardId) ?? null : null),
    [activeCardId]
  );

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
        .includes(query.toLowerCase())
    );
  }, [query, tab, favoritesHook.favorites]);

  const drawRandom = () => {
    if (!filteredCards.length) return;
    const random =
      filteredCards[Math.floor(Math.random() * filteredCards.length)];
    openCard(random.id);
  };

  const setActiveCard = (card: Card | null) => {
    if (card) openCard(card.id);
    else closeCard();
  };

  return (
    <div className="px-5 pt-35 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] relative overflow-hidden">
      <div className="flex flex-col justify-between sm:flex-row items-center gap-4 pb-6">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Tabs active={tab} onChange={(t: Tab) => setTab(t)} />
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
        <CardModal card={activeCard} onClose={closeCard} />
      )}
    </div>
  );
}

export default withAccessGate(CardsPageContent, MakCardsAccessGate);
