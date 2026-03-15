type ReflectionQuestionsProps = {
    items: string[];
    variant?: "dots" | "numbers";
  };
  
  export default function ReflectionQuestions({
    items,
    variant = "dots",
  }: ReflectionQuestionsProps) {
    const ListTag = variant === "numbers" ? "ol" : "ul";
  
    return (
      <div>
        <ListTag
          className={`pl-5 heading-4 body-text ${
            variant === "numbers" ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ListTag>
      </div>
    );
  }
  