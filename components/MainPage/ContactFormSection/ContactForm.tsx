"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FormField from "@/components/common/FormField";
import SelectField from "@/components/common/SelectField";
import TwoFrameButton from "@/components/common/TwoFrameButton";

const formSchema = z.object({
  fullName: z.string().min(2, "Введіть коректне ім’я"),
  email: z.string().email("Некоректний Email"),
  message: z.string().min(5, "Повідомлення надто коротке"),
  tariff: z.string().min(1, "Оберіть тариф"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    return axios.post("/api/contact", values).then((res) => {
      console.log("Sent:", res.data);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-visible pb-37.5">
      <h2 className="heading-2 text-center uppercase tracking-[-5px] lg:tracking-[-10px] mb-12.5">
        <span className="first-letter">Почніть</span> шлях{" "}
        <span className="first-letter">До</span>{" "}
        <span className="first-letter">внутрішнього</span>{" "}
        <span className="first-letter">балансу</span> та самоцінності вже
        сьогодні
      </h2>

      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-center gap-7.5 md:gap-16 w-full max-w-[1400px]"
        >
          <div className="w-full md:w-[45%] relative">
            <FormField
              label="Ім’я та Прізвище"
              placeholder="Ваше ім’я та фамілія"
            />

            <input
              {...register("fullName")}
              className="absolute opacity-0 pointer-events-none"
            />

            <p
              className={`
                text-red-600 text-sm absolute left-0 -bottom-6
                transition-all duration-300
                ${errors.fullName ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {errors.fullName?.message}
            </p>
          </div>

          <div className="w-full md:w-[45%] relative">
            <FormField
              label="Повідомлення"
              type="textarea"
              placeholder="Напишіть, що вас цікавить - ми з радістю відповімо"
            />

            <textarea
              {...register("message")}
              className="absolute opacity-0 pointer-events-none"
            />

            <p
              className={`
                text-red-600 text-sm absolute left-0 -bottom-6
                transition-all duration-300
                ${errors.message ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {errors.message?.message}
            </p>
          </div>

          <div className="w-full md:w-[45%] relative">
            <FormField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
            />

            <input
              {...register("email")}
              type="email"
              className="absolute opacity-0 pointer-events-none"
            />

            <p
              className={`
                text-red-600 text-sm absolute left-0 -bottom-6
                transition-all duration-300
                ${errors.email ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {errors.email?.message}
            </p>
          </div>

          <div className="w-full md:w-[45%] relative">
            <Controller
              name="tariff"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Оберіть тариф"
                  options={["Стандарт", "Медіум", "Преміум"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <p
              className={`
                text-red-600 text-sm absolute left-0 -bottom-6
                transition-all duration-300
                ${errors.tariff ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {errors.tariff?.message}
            </p>
          </div>

          <div className="w-full flex justify-center">
            <TwoFrameButton
              type="submit"
              disabled={isSubmitting}
              variant="one"
              label="Спробувати зараз"
              className="mt-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
