interface TitleProps {
    text: string;
    className?: string;
}

export default function Title({ text, className = "" }: TitleProps) {
    return (
        <h2 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-none tracking-normal text-black text-left ${className}`}>
            {text}
        </h2>
    );
}
