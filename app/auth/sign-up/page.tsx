"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";

const schema = z
  .object({
    name: z
      .string()
      .min(2, "Імʼя має містити мінімум 2 символи")
      .max(50, "Імʼя занадто довге")
      .regex(/^[A-Za-zА-Яа-яІіЇїЄєʼ’\- ]+$/, "Імʼя може містити лише літери"),

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

    confirmPassword: z.string().min(1, "Підтвердіть пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Паролі не співпадають",
  });

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
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
        "[data-signup-item]",
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
    console.log("SIGN UP DATA:", data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center px-5 pt-40 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <Image
        src={white_letter.WHITE_POSTCARD}
        alt="letter"
        className="absolute -right-15 -rotate-15 w-90 top-100 hidden lg:block lg:w-60 xl:w-90 xl:top-100 lg:top-55"
        data-signup-item
      />

      <h5
        className="heading-5 absolute top-0 left-0 w-35 md:w-75"
        data-signup-item
      >
        Тут починається шлях до зростання, гармонії та розвитку внутрішнього
        потенціалу.
      </h5>

      <h2
        className="heading-2 uppercase text-center pb-12 -tracking-widest md:tracking-normal"
        data-signup-item
      >
        <span className="first-letter" data-first-letter="З">
          ареєструйтесь
        </span>{" "}
        і
        <br className="hidden md:block" />
        <span className="first-letter" data-first-letter="В">
          ідновіть
        </span>{" "}
        <span className="first-letter" data-first-letter="Е">
          нергію
        </span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col gap-8"
        data-signup-item
      >
        <div>
          <label className="block pb-2 heading-4 text-[25px]">Імʼя</label>
          <input
            type="text"
            placeholder="Ваше імʼя"
            {...register("name")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block pb-2 heading-4 text-[25px]">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block pb-2 heading-4 text-[25px]">Пароль</label>
          <input
            type="password"
            placeholder="Введіть пароль"
            {...register("password")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <p className="text-xs opacity-60 mt-1">
            Мінімум 8 символів, велика і мала літера та цифра
          </p>
        </div>

        <div>
          <label className="block pb-2 heading-4 text-[25px]">
            Підтвердіть пароль
          </label>
          <input
            type="password"
            placeholder="Повторіть пароль"
            {...register("confirmPassword")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex gap-6 justify-center">
          <TwoFrameButton
            variant="one"
            label="Зареєструватися"
            type="submit"
            disabled={isSubmitting}
            data-signup-item
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
