type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-start">
      <div className="relative flex flex-col justify-center w-[90%] md:w-full">
        <h3 className="heading-3 max-w-140 relative">
          {question}

          <span
            className="
                 block
                text-brand-gray text-4xl
                absolute 
                -right-10 md:right-[-70px]
                top-1/2 -translate-y-1/2
              "
          >
            -
          </span>
        </h3>

        <p className="heading-4 mt-5 mb-7 max-w-150">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
