const InitialsCircle = () => {
    return( 
        <div className="w-[clamp(40px,8vw,100px)] h-[clamp(40px,8vw,100px)] rounded-full bg-brand-bordo text-white flex flex-col items-center justify-center text-center">
            <span
                className="font-kudriashov uppercase text-[clamp(13.2px,2vw,32px)]"
                style={{ lineHeight: "clamp(16px, 2.5vw, 30px)" }}
            >
                ab
            </span>
            <span
                className="font-kudriashov uppercase text-[clamp(5px,1vw,13px)] -translate-y-0.5 -tracking-tighter"
                style={{ lineHeight: "clamp(4px, 1.2vw, 13px)" }}
            >
                andreyko
            </span>
        </div>
    )
}

export default InitialsCircle
