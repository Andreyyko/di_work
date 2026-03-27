import { white_letter } from "@/public/images/CommonImages/PostCard";
import FrameWrapper from "../common/FrameWrapper";

type ListButtonProps = {
  variant?: "text" | "image";
  downloadHref?: string;
};

const ListButton = ({ variant = "text", downloadHref }: ListButtonProps) => {
  return (
    <div className="relative">
      {variant === "text" && (
        <FrameWrapper
          className="h-fit text-center"
          paddingYDesktop={140}
          paddingY={60}
          paddingX={40}
        >
          <h3 className="heading-3 uppercase">
            Доступно
            <br />
            після покупки розділу
          </h3>
        </FrameWrapper>
      )}

      {variant === "image" && (
        <a
          href={downloadHref ?? "#"}
          download
          className="block"
          aria-label="Скачати літературу"
        >
          <FrameWrapper
            className="h-fit text-center"
            imgWidth={450}
            paddingYDesktop={70}
            paddingY={20}
            paddingX={40}
            src={white_letter.ROTATE_POSTCARD}
          />
          <span className="absolute heading-4 translate-y-3 underline">
            Скачати літературу
          </span>
        </a>
      )}
    </div>
  );
};

export default ListButton;
