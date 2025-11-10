import React, { memo, useMemo } from "react";

export type LetterRule = {
  id: number;
  position: "start" | "end";
};

type Props = {
  text: string;
  highlights?: LetterRule[];
  className?: string;
};

const DEFAULT_LETTER_CLASS = "font-alexandra text-brand-bordo";
const DEFAULT_LETTER_SIZE = "140px";

function FontHeaderTwo({
  text,
  highlights = [],
  className = "heading-2",
}: Props) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  const rules = useMemo(() => new Map(highlights.map(r => [r.id, r])), [highlights]);

  let wordIndex = 0;

  return (
    <h2 className={className}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return token;

        const word = token;
        const rule = rules.get(wordIndex);
        wordIndex++;

        if (!rule || word.length === 0) {
          return <span key={`w-${i}`}>{word}</span>;
        }

        const glyphs = Array.from(word);
        const first = glyphs[0];
        const last = glyphs[glyphs.length - 1];

        const letterStyle: React.CSSProperties = {
          fontSize: DEFAULT_LETTER_SIZE,
          lineHeight: 1,
          display: "inline-block",
        };

        if (rule.position === "start") {
          return (
            <span key={`w-${i}`}>
              <span className={DEFAULT_LETTER_CLASS} style={letterStyle} aria-hidden="true">
                {first}
              </span>
              {glyphs.slice(1).join("")}
            </span>
          );
        }

        return (
          <span key={`w-${i}`}>
            {glyphs.slice(0, -1).join("")}
            <span className={DEFAULT_LETTER_CLASS} style={letterStyle} aria-hidden="true">
              {last}
            </span>
          </span>
        );
      })}
    </h2>
  );
}

export default memo(FontHeaderTwo);
