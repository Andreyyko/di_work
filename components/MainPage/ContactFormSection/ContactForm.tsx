"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [animate, setAnimate] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    console.log("FORM SUBMITTED:", values);
    reset();
    setResetSignal((n) => n + 1);
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "120px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!animate || !sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".contact-anim");
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          scale: 0.985,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power2.out",
          stagger: 0.12,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full overflow-visible pt-[250px]"
    >
      <h2 className="contact-anim opacity-0 heading-2 text-center uppercase tracking-[-5px] lg:tracking-[-10px] mb-12.5">
        <span className="first-letter">Почніть</span> шлях{" "}
        <span className="first-letter">До</span>{" "}
        <span className="first-letter">внутрішнього</span>{" "}
        <span className="first-letter">балансу</span> та самоцінності вже сьогодні
      </h2>

      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-center gap-7.5 md:gap-16 w-full max-w-[1400px]"
        >
          <div className="contact-anim opacity-0 w-full md:w-[45%] relative">
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

          <div className="contact-anim opacity-0 w-full md:w-[45%] relative">
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

          <div className="contact-anim opacity-0 w-full md:w-[45%] relative">
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

          <div className="contact-anim opacity-0 w-full md:w-[45%] relative z-100">
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

          <div className="contact-anim opacity-0 w-full flex justify-center">
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
