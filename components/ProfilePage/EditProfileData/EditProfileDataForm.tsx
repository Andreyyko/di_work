"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TwoFrameButton from "../../common/TwoFrameButton";
import Link from "next/link";
import { getMe, updateMe, setStoredUser, getStoredUser } from "@/api/auth-api";

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєʼ'\-\s]+$/;

const schema = z.object({
  firstName: z
    .string()
    .min(1, "Імʼя має містити мінімум 1 символ")
    .regex(nameRegex, "Імʼя може містити лише літери"),

  lastName: z
    .string()
    .min(1, "Прізвище має містити мінімум 1 символ")
    .regex(nameRegex, "Прізвище може містити лише літери"),

  email: z
    .string()
    .email("Некоректний email")
    .refine((val) => !/\s/.test(val), {
      message: "Email не може містити пробіли",
    }),
}).refine(
  (data) => (data.firstName.trim() + " " + data.lastName.trim()).trim().length >= 3,
  { message: "Імʼя та прізвище разом мають містити мінімум 3 символи", path: ["lastName"] }
);

type FormData = z.infer<typeof schema>;

function parseUsername(username: string): { firstName: string; lastName: string } {
  const trimmed = username.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  };
}

const emptyFormData: FormData = { firstName: "", lastName: "", email: "" };

const EditProfileDataForm = () => {
  const [loadError, setLoadError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: emptyFormData,
  });

  useEffect(() => {
    let cancelled = false;
    const stored = typeof window !== "undefined" ? getStoredUser() : null;
    if (stored) {
      const data: FormData = {
        ...parseUsername(stored.username),
        email: stored.email ?? "",
      };
      setInitialData(data);
      reset(data);
    }
    getMe()
      .then((user) => {
        if (cancelled) return;
        const data: FormData = {
          ...parseUsername(user.username),
          email: user.email ?? "",
        };
        setInitialData(data);
        reset(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Не вдалося завантажити профіль");
      });
    return () => { cancelled = true; };
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    setLoadError(null);
    const username = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
    try {
      const updated = await updateMe({ username, email: data.email });
      setStoredUser(updated);
      reset({ firstName: data.firstName, lastName: data.lastName, email: data.email });
      if (typeof window !== "undefined") window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не вдалося зберегти зміни";
      if (message.includes("Username") || message.includes("username") || message.includes("Ім'я")) {
        setError("firstName", { type: "server", message });
      } else if (message.includes("Email") || message.includes("email")) {
        setError("email", { type: "server", message });
      } else {
        setLoadError(message);
      }
    }
  };
  return (
    <div className="flex flex-col">
      <h2 className="heading-2 uppercase block md:hidden -tracking-wide">
        <span className="first-letter">Редагування</span>
        <span className="first-letter">персональ</span>
        <span className="">них даних</span>
      </h2>
      <h2 className="heading-2 uppercase hidden md:block -tracking-wide pb-5">
        <span className="first-letter">Редагування</span>
        <span className="first-letter">персональних даних</span>
      </h2>
      <h4 className="heading-4 w-full md:w-2/3 pb-5">
        Тут ви можете оновити свої персональні дані, щоб підтримувати актуальну
        інформацію для входу та спілкування.
      </h4>
      <hr className="pb-5" />
      {!initialData && !loadError && (
        <p className="heading-6 w-full md:w-2/3 pb-5">Завантаження...</p>
      )}
      {initialData && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full md:w-2/3"
        >
        <div>
          <label className="heading-4 pb-2 block">Імʼя</label>
          <input
            {...register("firstName")}
            placeholder="Ваше ім’я"
            className="w-full bg-transparent border-b opacity-100 border-black outline-none py-2 heading-6"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="heading-4 pb-2 block">Прізвище</label>
          <input
            {...register("lastName")}
            placeholder="Ваше прізвище"
            className="w-full bg-transparent border-b opacity-100 border-black outline-none py-2 heading-6"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="heading-4 pb-2 block">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="w-full bg-transparent border-b opacity-100 border-black outline-none py-2 heading-6"
          />
        </div>
        <h6 className="heading-6 w-[90%]">
          Після збереження змін ви зможете використовувати оновлені дані для
          входу та отримання сповіщень .
        </h6>
        <h6 className="heading-6">
          Якщо потрібно змінити пароль, скористайтеся сторінкою{" "}
          <Link className="underline" href="/auth/forgot-password">Зміна пароля.</Link>
        </h6>
        <div className="flex justify-center md:justify-start">
          <TwoFrameButton
            variant="one"
            label="Зберегти зміни"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
        </form>
      )}
    </div>
  );
};

export default EditProfileDataForm;
