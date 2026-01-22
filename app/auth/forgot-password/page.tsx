"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email обовʼязковий")
    .max(254, "Email занадто довгий")
    .email("Введіть коректну email-адресу")
    .refine((val) => !/\s/.test(val), {
      message: "Email не може містити пробіли",
    }),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
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
        "[data-forgot-item]",
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
    console.log("FORGOT PASSWORD EMAIL:", data);
  };

  return (
    <div className="min-h-screen flex relative flex-col pt-30 md:pt-50 items-center md:items-start px-4 md:px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] overflow-hidden">
      <Image
        src={white_letter.WHITE_POSTCARD_AB}
        alt="letter"
        className="absolute -right-55 lg:-right-20 xl:-right-55 w-90 top-100 hidden lg:block lg:w-80 xl:w-150 xl:top-50 lg:top-55"
        data-forgot-item
      />

      <h5
        className="heading-5 absolute top-0 left-0 w-35 md:w-75"
        data-forgot-item
      >
        Кожен крок у цей простір — це подорож до себе, відкриття нових
        можливостей і ресурсів.
      </h5>

      <h2
        className="heading-2 uppercase text-center pb-12 -tracking-widest md:tracking-normal"
        data-forgot-item
      >
        <span className="first-letter" data-first-letter="з">
          абули
        </span>{" "}
        <span>Пароль?</span>
      </h2>

      <h3
        className="heading-3 text-black text-left pb-10 w-full md:w-[50%]"
        data-forgot-item
      >
        Введіть адресу електронної пошти, яку ви використовували при реєстрації.
        Ми надішлемо вам лист із інструкцією для відновлення доступу
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col gap-8"
        data-forgot-item
      >
        <div>
          <label className="block pb-2 heading-4 text-[25px]">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black focus:border-black outline-none py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 items-center lg:items-start gap-10">
          <TwoFrameButton
            variant="one"
            label="Відправити код"
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-3 border border-black uppercase tracking-wide"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
