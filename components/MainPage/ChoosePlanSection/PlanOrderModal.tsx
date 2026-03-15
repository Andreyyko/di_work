"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleClose = () => {
    if (!modalRef.current || !containerRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(modalRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }).to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      "<"
    );
  };

  useLayoutEffect(() => {
    if (!open || !containerRef.current || !modalRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, scale: 0.9, y: 20 });
      gsap.set(".anim-item", { opacity: 0, y: 15 });

      const tl = gsap.timeline();

      tl.to(containerRef.current, { 
        opacity: 1, 
        duration: 0.3 
      })
      .to(modalRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.2)"
      }, "-=0.15") 
      .to(".anim-item", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all" 
      }, "-=0.3");

    }, containerRef); 

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]); 

  if (!open) return null;

  const onSubmit = (data: FormData) => {
    console.log("ORDER DATA:", data);
    handleClose();
  };

  return (
    <ModalPortal>
      <div
        ref={containerRef}
        className="fixed inset-0 z-999 bg-black/90 flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="order-modal relative w-full max-w-[1177px] bg-[#6F1420] text-white px-12 lg:px-72 py-14"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 opacity-80 hover:opacity-100 transition z-10"
          >
            <X size={26} />
          </button>

          <h2 className="anim-item text-center heading-2 text-white uppercase leading-none mb-10">
            <span className="first-letter-modal">Замовлення</span>
            <br />
            розділ<span className="first-letter-modal">у</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="anim-item">
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

            <div className="anim-item">
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

            <div className="anim-item">
              <label className="block heading-4 mb-2 pt-4 text-white">
                Оберіть тариф
              </label>
              <select
                {...register("plan")}
                className={`w-full bg-transparent border-b heading-4 py-2 text-white outline-none cursor-pointer
                  ${errors.plan ? "border-red-400" : "border-white"}
                `}
              >
                <option value="" className="text-black">
                  —
                </option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id} className="text-black">
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

            <div className="anim-item min-h-10 pt-3">
              {selectedPlan && (
                <div className="text-center text-[22px]">
                  {selectedPlan.price} ₴
                </div>
              )}
            </div>

            <div className="anim-item flex justify-center pt-6">
              <TwoFrameButton
                variant="three"
                label="Придбати"
                type="submit"
                disabled={isSubmitting}
              />
            </div>

            <p className="anim-item text-center opacity-60 text-sm pt-2">
              Оплата безпечна. Усі дані захищені
            </p>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}