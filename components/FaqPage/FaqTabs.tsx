"use client";

import TwoFrameButtonGroup from "../common/TwoFrameButtonGroup";

interface Props {
  activeTab: string;
  onChange: (value: string) => void;
}

export default function FaqTabs({ activeTab, onChange }: Props) {
  const tabsOne = [
    { id: "methodologies", label: "Про методики" },
    { id: "trainings", label: "Про тренінги та МАК картини" },
    { id: "payment", label: "Про оплату та доступ" },
    { id: "certificates", label: "Про сертифікати" },
    { id: "results", label: "Про результати" },
    { id: "technical", label: "Технічні питання" },
  ];


  return (
    <div className="">
      <TwoFrameButtonGroup
        buttons={tabsOne.map((tab) => ({
          variant: "two",
          label: tab.label,
          onActivate: () => onChange(tab.id),
        }))}
      />
    </div>
  );
}
