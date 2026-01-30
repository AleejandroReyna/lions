
interface TitleProps {
    text: string;
}

export default function Title({ text }: TitleProps) {
    return (
        <h1 style={{ fontSize: '90px', maxWidth: '70%' }} className="font-bold leading-tight text-left">
            {text}
        </h1>
    );
}
