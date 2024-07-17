import { Carousel, Typography, Button, CardBody } from "@material-tailwind/react";

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

const SliderCentral = () => {
    return (
        <div className="overflow-hidden">
            <div className="relative w-full">{/* <div className="relative h-full w-full"> */}
                <img
                    src="https://t4.ftcdn.net/jpg/03/59/29/07/360_F_359290749_bv1EgfiihMkEluMhEJIFZoA48y30Tgsu.jpg"
                    alt="image 1"
                    className="h-full w-full h-screen"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                            Transforme Sua Vida com o Método VFP
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-12 opacity-80"
                        >
                            <CardBody className="p-0">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex items-start gap-4 pt-2">Libertando Sua Mente para uma Vida Plena e Significativa</li>
                                    <li className="flex items-start gap-1">
                                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            <CheckIcon />
                                        </span>
                                        <Typography className="font-normal">Melhora significativa na qualidade de vida</Typography>
                                    </li>
                                    <li className="flex items-start gap-1">
                                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            <CheckIcon />
                                        </span>
                                        <Typography className="font-normal">Redução de sintomas de transtornos mentais</Typography>
                                    </li>
                                    <li className="flex items-start gap-1">
                                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            <CheckIcon />
                                        </span>
                                        <Typography className="font-normal">Aumento do bem-estar e satisfação pessoal</Typography>
                                    </li>
                                    <li className="flex items-start gap-1">
                                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            <CheckIcon />
                                        </span>
                                        <Typography className="font-normal">Desenvolvimento de valores bem definidos</Typography>
                                    </li>
                                    <li className="flex items-start gap-1">
                                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                            <CheckIcon />
                                        </span>
                                        <Typography className="font-normal">
                                            Desenvolvimento de vida bem delimitado
                                        </Typography>
                                    </li>
                                </ul>
                            </CardBody>
                        </Typography>
                        <div className="flex justify-center gap-2">
                            <Button size="lg" color="white">
                                Saiba mais
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SliderCentral