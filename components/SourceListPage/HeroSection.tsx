const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="heading-2 uppercase text-center pt-20  -tracking-widest">
        <span className="first-letter" data-first-letter="с">
          писок
        </span>{" "}
        <span className="first-letter" data-first-letter="в">
          икористаної
        </span>
        <span className="first-letter" data-first-letter="л">
          ітератури
        </span>
      </h2>
      <h3 className="heading-3 text-black text-center w-full lg:w-[80%]">
        На цій сторінці ви знайдете рекомендовану літературу, яка допоможе вам
        глибше ознайомитись з методиками, принципами психотерапії та
        особистісного розвитку. Наші джерела включають класичні та сучасні
        праці, що підтримують наукову обґрунтованість наших підходів та технік
      </h3>
    </div>
  );
};

export default HeroSection;
