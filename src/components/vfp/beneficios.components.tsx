import { Carousel, Typography, Button, CardBody, Card } from "@material-tailwind/react";

function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

const Beneficios = () => {
    return (
        <div className="mt-5 pl-2 pr-2">
            <Card className="mt-6 rounded-xl border border-white bg-black/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <CardBody>
                    <Typography variant="h3">Benefícios do Método VFP</Typography>
                    <CardBody className="p-0">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4 pt-2">Libertando Sua Mente para uma Vida Plena e Significativa</li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">Melhora significativa na qualidade de vida</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">Redução de sintomas de transtornos mentais</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">Aumento do bem-estar e satisfação pessoal</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">Desenvolvimento de valores bem definidos</Typography>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">
                                    Desenvolvimento de vida bem delimitado
                                </Typography>
                            </li>
                        </ul>
                    </CardBody>
                </CardBody>
            </Card>
        </div>
    )
}

export default Beneficios