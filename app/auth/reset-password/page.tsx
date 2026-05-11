"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";

import TwoFrameButton from "@/components/common/TwoFrameButton";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import { resetPassword, getResetCode, clearResetCode } from "@/api/auth-api";

const schema = z
  .object({
    code: z
      .string()
      .min(6, "Код має складатися з 6 цифр")
      .max(6, "Код має складатися з 6 цифр")
      .regex(/^\d{6}$/, "Код має містити лише цифри"),
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

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [storedCode, setStoredCode] = useState<string | null>(null);

  useEffect(() => {
    setStoredCode(getResetCode());
  }, []);

  const email = useMemo(() => {
    const raw = searchParams.get("email");
    if (!raw) return null;
    try {
      return decodeURIComponent(raw);
    } catch {
      return null;
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (storedCode) setValue("code", storedCode);
  }, [storedCode, setValue]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reset-item]",
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
    if (!email) {
      setSubmitError("Email не знайдено. Перейдіть зі сторінки «Забули пароль».");
      return;
    }
    const code = storedCode ?? data.code;
    if (!code) {
      setSubmitError("Введіть код з email або перейдіть зі сторінки введення коду.");
      return;
    }
    setSubmitError(null);
    try {
      await resetPassword({
        email,
        code,
        password: data.password,
      });
      clearResetCode();
      router.push("/auth/sign-in");
      router.refresh();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Не вдалося скинути пароль"
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col pt-30 md:pt-50 items-start px-4 md:px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <Image
        src={white_letter.WHITE_POSTCARD_AB}
        alt="letter"
        className="absolute -right-55 lg:-right-20 xl:-right-55 w-90 top-100 hidden lg:block lg:w-80 xl:w-150 xl:top-50 lg:top-55"
        data-reset-item
      />

      <h5
        className="heading-5 absolute top-0 left-0 w-35 md:w-75"
        data-reset-item
      >
        Кожен крок у цей простір — це подорож до себе, відкриття нових
        можливостей і ресурсів.
      </h5>

      <h2
        className="heading-2 uppercase pb-12 -tracking-widest md:tracking-normal"
        data-reset-item
      >
        <span className="block md:hidden">
          <span className="first-letter" data-first-letter="С">
            творіть
          </span>
          <br />
          Новий Пароль
        </span>

        <span className="hidden md:block">
          <span className="first-letter" data-first-letter="С">
            творіть Новий
          </span>
          <br />
          Пароль
        </span>
      </h2>

      <h3
        className="heading-3 text-black text-left pb-10 w-full md:w-[50%]"
        data-reset-item
      >
        {storedCode
          ? "Введіть новий пароль. Пароль повинен містити не менше 8 символів."
          : "Введіть код з email та новий пароль. Пароль повинен містити не менше 8 символів."}
      </h3>

      {email && (
        <p className="heading-6 text-left pb-4 w-full max-w-3xl" data-reset-item>
          Email: <strong>{email}</strong>
        </p>
      )}

      {!email && (
        <p className="text-red-500 text-sm pb-4" data-reset-item>
          Не вказано email. Перейдіть зі сторінки «Забули пароль».
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl flex flex-col gap-8"
        data-reset-item
      >
        {!storedCode && (
          <div>
            <label className="block pb-2 heading-4 text-[25px]">
              Код з email (6 цифр)
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              maxLength={6}
              {...register("code")}
              className="w-full bg-transparent heading-6 text-[20px] border-b border-black focus:border-black outline-none py-2"
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="block pb-2 heading-4 text-[25px]">
            Новий пароль
          </label>
          <input
            type="password"
            placeholder="Введіть новий пароль"
            {...register("password")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black focus:border-black outline-none py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block pb-2 heading-4 text-[25px]">
            Підтвердіть пароль
          </label>
          <input
            type="password"
            placeholder="Повторіть новий пароль"
            {...register("confirmPassword")}
            className="w-full bg-transparent heading-6 text-[20px] border-b border-black focus:border-black outline-none py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 items-center lg:items-start gap-10">
          <TwoFrameButton
            variant="one"
            label="Зберегти та увійти"
            type="submit"
            disabled={isSubmitting || !email}
            className="px-10 py-3 border border-black uppercase tracking-wide"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
