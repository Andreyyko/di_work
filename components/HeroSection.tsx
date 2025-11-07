import FontHeaderTwo from "./common/FontHeaderTwo"

const HeroSection = () => {
    return(
        <section>
        <h5 className="heading-5 flex text-right justify-end">
            Простір, де психологія поєднується з<br/>
            креативом, де вправи стають ключем до<br/>
            самопізнання, а гра — до нових<br/>
            можливостей.
        </h5>
        <FontHeaderTwo
            text="РОК-М"
            highlights={[
                {id:0, className: "font-alexandra text-brand-bordo", size: "140px"},
            ]}
        />
        <FontHeaderTwo
            text="РЕСУРНО-ОРІЄНТОВАНІ"
            highlights={[
                {id:0, className: "font-alexandra text-brand-bordo", size: "140px"},
            ]}
        />
        <FontHeaderTwo
            text="КОНГНІТИВНІ МЕТОДИКИ"
            highlights={[
                {id:0, className: "font-alexandra text-brand-bordo", size: "140px"},
                {id:12, className: "font-alexandra text-brand-bordo", size: "140px"},
            ]}
        />
        </section>
    )
}

export default HeroSection