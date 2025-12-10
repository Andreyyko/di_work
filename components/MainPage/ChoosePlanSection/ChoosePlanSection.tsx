import PlanSectionMobile from "./PlanSectionMobile";
import PlanSection from "./PlansSection";

const ChoosePlanSection = () => {
  return (
    <section className="pb-responsive">
      <div className="flex flex-row">
        <p className="hidden lg:block heading-5 left-0 -translate-x-5">
          Найзручніший формат
          <br />
          для старту:
          <br />
          поєднання ключових
          <br />
          матеріалів,
          <br />
          додаткової підтримки
          <br />
          та можливості
          <br />
          отримати результат
          <br />
          вже зараз
        </p>
        <h2 className="heading-2 pb-5 translate-x-1 md:translate-none">
          <span
            className="first-letter uppercase text-start"
            data-first-letter="о"
          >
            бирайте формат, що
          </span>
          <br />
          <span
            className="first-letter absolute uppercase right-5"
            data-first-letter="п"
          >
            ідходить саме{" "}
          </span>
          <br />
          <span
            className="first-letter uppercase block text-center translate-y-1 md:translate-y-0"
            data-first-letter="в"
          >
            ам
          </span>
        </h2>
      </div>
      <span className="heading-3 relative md:absolute md:right-15 md:-translate-y-14 leading-tighter lg:-translate-y-17">
        Три рівні: від одного розділу<br className="hidden md:block"/>методик до повного доступу
        </span>
    <div className="hidden lg:block">
      <PlanSection/>
      </div>
      <div className="block lg:hidden">
      <PlanSectionMobile/>
      </div>
    </section>
  );
};

export default ChoosePlanSection;
