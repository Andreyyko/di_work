"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import Link from "next/link";
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

  password: z
    .string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(64, "Пароль занадто довгий")
    .refine((val) => /[a-z]/.test(val), {
      message: "Пароль має містити хоча б одну малу літеру",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Пароль має містити хоча б одну велику літеру",
    })
    .refine((val) => /\d/.test(val), {
      message: "Пароль має містити хоча б одну цифру",
    })
    .refine((val) => !/\s/.test(val), {
      message: "Пароль не може містити пробіли",
    }),
});

type FormData = z.infer<typeof schema>;

const SignInPage = () => {
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
        "[data-signin-item]",
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
    console.log("LOGIN DATA:", data);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center overflow-hidden items-center px-5 pt-30 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute -right-15 -rotate-15 w-90 top-100 hidden lg:block lg:w-60 xl:w-90 xl:top-100 lg:top-55"
        data-signin-item
      />

      <h5
        className="heading-5 absolute top-0 left-0 w-35 md:w-75"
        data-signin-item
      >
        Кожен крок у цей простір — це подорож до себе, відкриття нових
        можливостей і ресурсів.
      </h5>

      <h2 className="heading-2 uppercase text-center pb-12" data-signin-item>
        <span className="first-letter" data-first-letter="В">
          хід
        </span>{" "}
        до{" "}
        <span className="first-letter" data-first-letter="П">
          ростору
        </span>{" "}
        <span className="first-letter" data-first-letter="Р">
          озвитку
        </span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col gap-8"
        data-signin-item
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

        <div>
          <label className="block pb-2 heading-4 text-[25px]">Пароль</label>
          <input
            type="password"
            placeholder="Введіть ваш пароль"
            {...register("password")}
            className="w-full bg-transparent border-b heading-6 text-[20px] border-black focus:border-black outline-none py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="heading-6 text-[20px] pt-5 inline-block opacity-70 hover:opacity-100"
          >
            Забули пароль?
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 items-center gap-10 justify-center">
          <TwoFrameButton
            variant="one"
            label="Увійти"
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-3 border border-black rounded-full uppercase tracking-wide hover:bg-black hover:text-white transition"
          />

          <Link href="/auth/sign-up">
            <TwoFrameButton
              variant="one"
              label="Створити акаунт"
              className="translate-y-0.5"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
