const InitialsCircle = () => {
    return( 
        <div className="w-[clamp(40px,8vw,100px)] h-[clamp(40px,8vw,100px)] rounded-full bg-brand-bordo text-white flex flex-col items-center justify-center text-center">
            <span
                className="font-kudriashov text-[clamp(14px,2vw,32px)]"
                style={{ lineHeight: "clamp(16px, 2.5vw, 30px)" }}
            >
                AB
            </span>
            <span
                className="font-kudriashov text-[clamp(5px,1vw,13px)]"
                style={{ lineHeight: "clamp(4px, 1.2vw, 13px)" }}
            >
                ANDREYKO
            </span>
        </div>
    )
}

export default InitialsCircle
