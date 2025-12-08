"use client";

import React, { useState } from "react";
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
  const [resetSignal, setResetSignal] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    console.log("FORM SUBMITTED:", values);

    reset();
    setResetSignal((n) => n + 1); 
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-visible pt-[250px]">
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
          {/* FULL NAME */}
          <div className="w-full md:w-[45%] relative">
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <FormField
                  label="Ім’я та Прізвище"
                  placeholder="Ваше ім’я та фамілія"
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                  resetSignal={resetSignal}
                />
              )}
            />
          </div>

          {/* MESSAGE */}
          <div className="w-full md:w-[45%] relative">
            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <FormField
                  type="textarea"
                  label="Повідомлення"
                  placeholder="Напишіть, що вас цікавить - ми з радістю відповімо"
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                  resetSignal={resetSignal}
                />
              )}
            />
          </div>

          {/* EMAIL */}
          <div className="w-full md:w-[45%] relative">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <FormField
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                  resetSignal={resetSignal}
                />
              )}
            />
          </div>

          {/* TARIFF */}
          <div className="w-full md:w-[45%] relative">
            <Controller
              name="tariff"
              control={control}
              render={({ field, fieldState }) => (
                <SelectField
                  label="Оберіть тариф"
                  options={["Стандарт", "Медіум", "Преміум"]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          {/* SUBMIT */}
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
