
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TwoFrameButton from "../../common/TwoFrameButton";
import Link from "next/link";

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєʼ’\-]+$/;

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Імʼя має містити мінімум 2 символи")
    .regex(nameRegex, "Імʼя може містити лише літери"),

  lastName: z
    .string()
    .min(2, "Прізвище має містити мінімум 2 символи")
    .regex(nameRegex, "Прізвище може містити лише літери"),

  email: z
    .string()
    .email("Некоректний email")
    .refine((val) => !/\s/.test(val), {
      message: "Email не може містити пробіли",
    }),
});

type FormData = z.infer<typeof schema>;

const EditProfileDataForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("UPDATE PROFILE:", data);
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
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
    </div>
  );
};

export default EditProfileDataForm;
