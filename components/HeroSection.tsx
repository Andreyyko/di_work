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
                {id:0, position:"start"},
            ]}
        />
        <FontHeaderTwo
            text="РЕСУРНО-ОРІЄНТОВАНІ"
            highlights={[
                {id:0, position: "start"},
            ]}
        />
        <FontHeaderTwo
            text="КОНГНІТИВНІ МЕТОДИКИ"
            highlights={[
                {id:1, position: "start"},
                {id:0, position: "start"},
            ]}
        />
        </section>
    )
}

export default HeroSection