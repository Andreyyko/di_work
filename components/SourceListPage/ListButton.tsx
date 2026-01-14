import { white_letter } from "@/public/images/CommonImages/PostCard";
import FrameWrapper from "../common/FrameWrapper";

const ListButton = ({ variant = "text" }) => {
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
            Дається тільки
            <br />
            після покупки всіх розділів
          </h3>
        </FrameWrapper>
      )}

      {variant === "image" && (
        <>
          <FrameWrapper
            className="h-fit text-center"
            imgWidth={450}
            paddingYDesktop={70}
            paddingY={20}
            paddingX={40}
            src={white_letter.ROTATE_POSTCARD}
          />
          <span className="absolute heading-4 translate-y-3">
            Переглянути літературу
          </span>
        </>
      )}
    </div>
  );
};

export default ListButton;
