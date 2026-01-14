"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import TwoFrameButton from "@/components/common/TwoFrameButton";
import { X } from "lucide-react";
import ModalPortal from "@/components/common/ModalPortal";

const plans = [
  { id: "standard", label: "Стандарт", price: 1999 },
  { id: "medium", label: "Медіум", price: 2999 },
  { id: "premium", label: "Преміум", price: 3999 },
  { id: "mak", label: "МАК-картини", price: 1999 },
];

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєʼ’\-]+ [A-Za-zА-Яа-яІіЇїЄєʼ’\-]+$/;

const schema = z.object({
  fullName: z
    .string()
    .min(5, "Введіть імʼя та прізвище")
    .regex(nameRegex, "Введіть імʼя та прізвище (через пробіл, без цифр)"),
  email: z.string().email("Некоректний email"),
  plan: z.string().min(1, "Оберіть тариф"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PlanOrderModal({ open, onClose }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedPlan = plans.find((p) => p.id === watch("plan"));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    gsap.fromTo(
      ".order-modal",
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }, [open]);

  if (!open) return null;

  const onSubmit = (data: FormData) => {
    console.log("ORDER DATA:", data);
    onClose();
  };

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="order-modal relative w-full max-w-[1177px] bg-[#6F1420] text-white px-12 lg:px-72 py-14"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 opacity-80 hover:opacity-100 transition"
          >
            <X size={26} />
          </button>

          <h2 className="text-center heading-2 text-white uppercase leading-none mb-10">
            <span className="first-letter-modal">Замовлення</span>
            <br />
            розділ<span className="first-letter-modal">у</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <label className="block heading-4 text-white mb-1">
                Імʼя та Прізвище
              </label>
              <input
                {...register("fullName")}
                className={`w-full bg-transparent border-b opacity-100 heading-6 text-[20px] text-white outline-none py-2
                  ${errors.fullName ? "border-red-400" : "border-white"}
                `}
                placeholder="Ваше імʼя та прізвище"
              />
              {errors.fullName && (
                <p className="text-[#F4C9C9] text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block heading-4 text-white mb-1 pt-4">
                Email
              </label>
              <input
                {...register("email")}
                className={`w-full bg-transparent border-b heading-6 text-[20px] text-white opacity-100 outline-none py-2
                  ${errors.email ? "border-red-400" : "border-white"}
                `}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-[#F4C9C9] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block heading-4 mb-2 pt-4 text-white">
                Оберіть тариф
              </label>
              <select
                {...register("plan")}
                className={`w-full bg-transparent border-b heading-4 py-2 text-white outline-none
                  ${errors.plan ? "border-red-400" : "border-white"}
                `}
              >
                <option value="">—</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.plan && (
                <p className="text-[#F4C9C9] text-sm mt-1">
                  {errors.plan.message}
                </p>
              )}
            </div>

            {selectedPlan && (
              <div className="text-center text-[22px] pt-3">
                {selectedPlan.price} ₴
              </div>
            )}

            <div className="flex justify-center pt-6">
              <TwoFrameButton
                variant="three"
                label="Придбати"
                type="submit"
                disabled={isSubmitting}
              />
            </div>

            <p className="text-center opacity-60 text-sm pt-2">
              Оплата безпечна. Усі дані захищені
            </p>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
