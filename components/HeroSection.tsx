import FontHeaderTwo from "./common/FontHeaderTwo"
import type { LetterRule } from "./common/FontHeaderTwo"

type Header = { text: string; highlights: LetterRule[]; className?: string };


const headers = [
    {
      text: "РОК-М",
      highlights: [{ id: 0, position: "start" }],
      className: "w-fit justify-self-center translate-x-4 sm:translate-x-6 md:translate-x-10",
    },
    {
      text: "РЕСУРСНО-ОРІЄНТОВАНІ",
      highlights: [{ id: 0, position: "start" }],
      className: "w-fit justify-self-start translate-x-2 sm:translate-x-4 md:translate-x-6",
    },
    {
      text: "КОГНІТИВНІ МЕТОДИКИ",
      highlights: [
        { id: 1, position: "start" },
        { id: 0, position: "start" }
      ],
      className: "w-fit justify-self-end -translate-x-2 sm:-translate-x-4 md:-translate-x-6",
    }
  ] satisfies Header[]

const HeroSection = () => {
  return (
    <section>
      <h5 className="heading-5 flex text-right justify-end">
        Простір, де психологія поєднується з<br />
        креативом, де вправи стають ключем до<br />
        самопізнання, а гра — до нових<br />
        можливостей.
      </h5>

      <div className=""> 
      {headers.map((item, index) => (
        <FontHeaderTwo
          key={index}
          text={item.text}
          highlights={item.highlights}
          className={item.className}
        />
      ))}
      </div>
      <h6 className="heading-4">Перший в Україні психологічний сайт,  evidence-based онлайн-каталог із понад 1000 технік, вправ, інтервенцій, практик спрямований на підтримку психічного здоров’я та всіх сфер особистості.</h6>
    </section>
  )
}

export default HeroSection
