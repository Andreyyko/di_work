"use client";

// Type for a carousel item
interface CarouselItem {
  title: string;
  description: string;
}

interface TextBlockProps {
  activeItem: CarouselItem;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  isSmallerThanSm: boolean;
}

export default function TextBlock({
  activeItem,
  titleRef,
  descRef,
  isSmallerThanSm,
}: TextBlockProps) {
  return (
    <div className="absolute text-center left-1/2 top-[62%] md:top-[75%] -translate-x-1/2 transform">
      <h3
        ref={titleRef}
        className="heading-3 uppercase mb-5 w-[290px] sm:w-[400px] md:w-10/12 mx-auto"
      >
        {activeItem.title}
      </h3>

      <p
        ref={descRef}
        className="heading-6 w-[250px] sm:w-[300px] md:w-10/12 mx-auto"
      >
        {activeItem.description}
      </p>
    </div>
  );
}
