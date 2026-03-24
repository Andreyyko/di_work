"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";

import FormField from "@/components/common/FormField";
import SelectField from "@/components/common/SelectField";
import TwoFrameButton from "@/components/common/TwoFrameButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const formSchema = z.object({
  fullName: z.string().min(2, "Введіть коректне ім’я (мін. 2 символи)"),
  email: z.string().email("Некоректний Email"),
  message: z.string().min(10, "Повідомлення надто коротке (мін. 10 символів)"),
  tariff: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", message: "", tariff: "" },
    mode: "onSubmit", // валідація тільки при відправці, не при зміні/скиданні полів
  });

  const handleSuccess = () => {
    setSubmitError(null);
    setSubmitSuccess(true);
    reset({ fullName: "", email: "", message: "", tariff: "" }, { keepErrors: false });
    setResetSignal((n) => n + 1);
    // Після reset() може спрацювати валідація на порожніх полях — скидаємо помилки в наступному тіку
    setTimeout(() => clearErrors(), 0);
  };

  const handleError = (message: string) => {
    setSubmitSuccess(false);
    setSubmitError(message);
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          message: values.message,
          email: values.email,
          tariff: values.tariff || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          (data && typeof data.message === "string") ? data.message : "Не вдалося надіслати повідомлення";
        handleError(message);
        return;
      }
      handleSuccess();
    } catch {
      handleError("Помилка з’єднання. Спробуйте пізніше.");
    }
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
      id="contact"
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

          {(submitError || submitSuccess) && (
            <div
              className={`w-full text-center text-sm md:text-base ${
                submitSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitSuccess ? "Повідомлення надіслано. Дякуємо!" : submitError}
            </div>
          )}

          <div className="contact-anim opacity-0 w-full flex justify-center">
            <TwoFrameButton
              type="submit"
              disabled={isSubmitting}
              variant="one"
              label={isSubmitting ? "Надсилання…" : "Спробувати зараз"}
              className="mt-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
