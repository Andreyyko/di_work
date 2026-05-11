"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import {
  register as registerUser,
  setJwt,
  setStoredUser,
} from "@/api/auth-api";

const schema = z
  .object({
    name: z
      .string()
      .min(3, "Ім'я (логін) має містити мінімум 3 символи")
      .max(50, "Ім'я занадто довге")
      .regex(/^[A-Za-zА-Яа-яІіЇїЄєʼ’\- ]+$/, "Ім'я може містити лише літери"),
    surname: z
      .string()
      .min(2, "Прізвище має містити мінімум 2 символи")
      .max(50, "Прізвище занадто довге")
      .regex(/^[A-Za-zА-Яа-яІіЇїЄєʼ’\- ]+$/, "Прізвище може містити лише літери"),
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
  const router = useRouter();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    try {
      const username = `${data.name.trim()} ${data.surname.trim()}`.replace(
        /\s+/g,
        " ",
      );

      const res = await registerUser({
        email: data.email,
        username,
        password: data.password,
      });

      setJwt(res.jwt);
      setStoredUser(res.user);
      router.push("/profile/my-profile");
      router.refresh();
    } catch (err: any) {
      console.error("Помилка реєстрації:", err);

      const apiMessage =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Помилка реєстрації";

      const normalized = String(apiMessage).toLowerCase();

      if (
        normalized.includes("already") ||
        normalized.includes("taken") ||
        normalized.includes("exists") ||
        normalized.includes("email")
      ) {
        setSubmitError("Користувач з таким email уже існує");
        return;
      }

      if (normalized.includes("username")) {
        setSubmitError("Користувач з таким ім’ям уже існує");
        return;
      }

      setSubmitError(apiMessage);
    }
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
          <label className="block pb-2 heading-4 text-[25px]">Ім'я</label>
          <input
            type="text"
            placeholder="Ваше ім'я"
            {...register("name")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block pb-2 heading-4 text-[25px]">Прізвище</label>
          <input
            type="text"
            placeholder="Ваше прізвище"
            {...register("surname")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2"
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.surname.message}
            </p>
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введіть пароль"
              {...register("password")}
              className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-black/60 transition hover:text-black"
              aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Повторіть пароль"
              {...register("confirmPassword")}
              className="w-full bg-transparent heading-6 text-[20px] border-b border-black outline-none py-2 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-black/60 transition hover:text-black"
              aria-label={
                showConfirmPassword
                  ? "Приховати підтвердження пароля"
                  : "Показати підтвердження пароля"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {submitError && (
          <p className="text-red-500 text-sm text-center -mt-2">
            {submitError}
          </p>
        )}

        <div className="flex gap-6 justify-center">
          <TwoFrameButton
            variant="one"
            label={isSubmitting ? "Завантаження..." : "Зареєструватися"}
            type="submit"
            disabled={isSubmitting}
            data-signup-item
            className="disabled:opacity-50 disabled:pointer-events-none"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;