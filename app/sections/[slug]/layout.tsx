import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { HeadingPresetKey } from "@/constant/common/CustomHeadingPreset";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

type LayoutComponentProps = {
  children: React.ReactNode;
};

const sectionSeoMap: Record<
  HeadingPresetKey,
  { title: string; description: string }
> = {
  family: {
    title: "Психологічні техніки для сімей та пари | РОК-М",
    description:
      "Психологічні методики для сімейних пар: вправи для комунікації, довіри, емоційної близькості та гармонійних стосунків.",
  },
  life: {
    title: "Ресурсні вправи для дорослих і мотивації | РОК-М",
    description:
      "Ресурсно-орієнтовані психологічні практики для дорослих: робота з мотивацією, самодопомога, емоційна стабілізація та внутрішня опора.",
  },
  kids: {
    title: "Психологічні вправи для дітей і творчості | РОК-М",
    description:
      "Методики для розвитку творчості, мислення та емоційного інтелекту дітей: психологічні ігри, практичні вправи та арт-підхід.",
  },
  communicate: {
    title: "Вправи на комунікацію та соціальні навички | РОК-М",
    description:
      "Методики розвитку комунікативних компетенцій: вправи на комунікацію, соціально-емоційне навчання, групова взаємодія та коучингові техніки.",
  },
  pscyho: {
    title: "Методики для психоемоційної сфери та ПТСР | РОК-М",
    description:
      "Психотерапевтичні техніки при стресі, тривозі та ПТСР: вправи для регуляції емоцій, стабілізації стану та психологічні кризові інтервенції.",
  },
  parents: {
    title: "Методики усвідомленого батьківства | РОК-М",
    description:
      "Психологічні техніки для батьків: вправи на взаєморозуміння, емоційний контакт, підтримку дитини та розвиток здорової сімейної комунікації.",
  },
  uncommunicate: {
    title: "Методики для дітей з ООП, РАС, СДУГ | РОК-М",
    description:
      "Психолого-логопедичні та корекційні методики для дітей з особливими освітніми потребами: РАС, СДУГ, порушення мовлення, комунікація та розвиток.",
  },
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const key = slug as HeadingPresetKey;
  const seo = sectionSeoMap[key];

  if (!seo) {
    notFound();
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/sections/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/sections/${slug}`,
      type: "website",
    },
  };
}

export default function SectionSlugLayout({ children }: LayoutComponentProps) {
  return children;
}
