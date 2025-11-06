type Highlight = {
  id: number;                 
  className?: string;         
  size?: number | string;     
};

type FontHeaderTwoProps = {
  text: string;
  highlights?: Highlight[];
  className?: string;
  noWrap?: boolean;          
};

const FontHeaderTwo = ({
  text,
  highlights = [],
  className = "",
  noWrap = true,
}: FontHeaderTwoProps) => {
  return (
    <h2 className={`heading-2 ${noWrap ? "whitespace-nowrap" : ""} ${className}`}>
      {text.split("").map((char, index) => {
        const match = highlights.find((h) => h.id === index);

        
        const fontSize =
          typeof match?.size === "number" ? `${match!.size}px` : match?.size;

        return (
          <span
            key={index}
            className={match?.className ?? ""}
            style={fontSize ? { fontSize } : undefined}
          >
            {char}
          </span>
        );
      })}
    </h2>
  );
}
export default FontHeaderTwo
