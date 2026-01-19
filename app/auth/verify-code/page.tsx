"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import Image from "next/image";

const schema = z.object({
  code: z
    .string()
    .min(6, "Код має складатися з 6 цифр")
    .max(6, "Код має складатися з 6 цифр")
    .regex(/^\d{6}$/, "Код має містити лише цифри"),
});

type FormData = z.infer<typeof schema>;

const VerifyCodePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-verify-item]",
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.1,
          clearProps: "opacity,transform",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("VERIFY CODE:", data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col pt-30 md:pt-50 items-center md:items-start px-4 md:px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <Image
        src={white_letter.WHITE_POSTCARD_AB}
        alt="letter"
        className="absolute -right-55 lg:-right-20 xl:-right-55 w-90 top-100 hidden lg:block lg:w-80 xl:w-150 xl:top-50 lg:top-55"
        data-verify-item
      />

      <h5 className="heading-5 absolute top-0 left-0 w-35 md:w-75" data-verify-item>
        Кожен крок у цей простір — це подорож до себе, відкриття нових
        можливостей і ресурсів.
      </h5>

      <h2 className="heading-2 uppercase pb-12 -tracking-widest md:tracking-normal" data-verify-item>
        <span className="first-letter" data-first-letter="в">
          ведіть код
        </span>{" "}
        <br className="hidden md:block" />
        <span>Підтвердження</span>
      </h2>

      <h3 className="heading-3 text-black text-left pb-10 w-full md:w-[50%]" data-verify-item>
        На вашу електронну адресу надіслано 6-значний код. Введіть його нижче,
        щоб підтвердити вашу особу та продовжити відновлення пароля
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col gap-8"
        data-verify-item
      >
        <div>
          <label className="block pb-2 heading-4 text-[25px]">
            Код підтвердження
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="6 цифр"
            maxLength={6}
            {...register("code")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black focus:border-black outline-none py-2"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 items-center lg:items-start gap-10" data-verify-item>
          <TwoFrameButton
            variant="one"
            label="Змінити пароль"
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-3 border border-black uppercase tracking-wide"
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyCodePage;
