"use client";

import FrameWrapperForCarousel from "@/components/common/FrameWrapperForCarousel";

// Type for a single layout slot
interface LayoutSlot {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  center?: boolean;
  hidden?: boolean;
}

// Type for carousel image item
interface CarouselItem {
  src: {
    src: string;
  };
  title: string;
  description: string;
}

// Props for ImageSlots component
interface ImageSlotsProps {
  layout: LayoutSlot[];
  left: CarouselItem[];
  right: CarouselItem[];
  center: CarouselItem;
  setSlot: (index: number) => (el: HTMLImageElement | null) => void;
}

export default function ImageSlots({
  layout,
  left,
  right,
  center,
  setSlot,
}: ImageSlotsProps) {
  return (
    <>
      {/* LEFT SMALL */}
      {!layout[0].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[0].width}px`}
          height={`${layout[0].height}px`}
          className="absolute"
          style={layout[0]}
        >
          <img
            ref={setSlot(0)}
            src={left[0].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}

      {/* LEFT MID */}
      {!layout[1].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[1].width}px`}
          height={`${layout[1].height}px`}
          className="absolute"
          style={layout[1]}
        >
          <img
            ref={setSlot(2)}
            src={left[2].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}

      {/* LEFT BIG */}
      {!layout[2].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[2].width}px`}
          height={`${layout[2].height}px`}
          className="absolute"
          style={layout[2]}
        >
          <img
            ref={setSlot(1)}
            src={left[1].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}

      {/* CENTER */}
      <FrameWrapperForCarousel
        width={`${layout[3].width}px`}
        height={`${layout[3].height}px`}
        showOrnaments
        className="absolute top-[5%] left-[50%] md:top-[10%] md:left-[13%] lg:top-[10%] lg:left-[17%] xl:top-[15%] xl:left-[15%] transform -translate-x-1/2 -translate-y-1/2"
      >
        <img
          ref={setSlot(3)}
          src={center.src.src}
          className="w-full h-full object-cover"
        />
      </FrameWrapperForCarousel>

      {/* RIGHT SMALL */}
      {!layout[4].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[4].width}px`}
          height={`${layout[4].height}px`}
          className="absolute"
          style={layout[4]}
        >
          <img
            ref={setSlot(6)}
            src={right[2].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}

      {/* RIGHT BIG */}
      {!layout[5].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[5].width}px`}
          height={`${layout[5].height}px`}
          className="absolute"
          style={layout[5]}
        >
          <img
            ref={setSlot(5)}
            src={right[1].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}

      {/* RIGHT MID */}
      {!layout[6].hidden && (
        <FrameWrapperForCarousel
          width={`${layout[6].width}px`}
          height={`${layout[6].height}px`}
          className="absolute"
          style={layout[6]}
        >
          <img
            ref={setSlot(4)}
            src={right[0].src.src}
            className="w-full h-full object-cover"
          />
        </FrameWrapperForCarousel>
      )}
    </>
  );
}
