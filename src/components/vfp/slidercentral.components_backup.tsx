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

const SliderCentralBackup = () => {
    return (
        <Carousel className="rounded-xl overflow-hidden">
            <div className="relative h-full w-full">{/* <div className="relative h-full w-full"> */}
                <img
                    src="https://t4.ftcdn.net/jpg/03/59/29/07/360_F_359290749_bv1EgfiihMkEluMhEJIFZoA48y30Tgsu.jpg"
                    alt="image 1"
                    className="h-full w-full"
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
                            Libertando Sua Mente para uma Vida Plena e Significativa
                        </Typography>
                        <div className="flex justify-center gap-2">
                            <Button size="lg" color="white">
                                Saiba mais
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
                <div className="relative h-full w-full">
                    <img
                        src="https://t4.ftcdn.net/jpg/03/59/29/07/360_F_359290749_bv1EgfiihMkEluMhEJIFZoA48y30Tgsu.jpg"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
                        <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Benefícios do Método VFP
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                <CardBody className="p-0">
                                    <ul className="flex flex-col gap-4">
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
                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white">
                                    Explore
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src="https://t4.ftcdn.net/jpg/03/59/29/07/360_F_359290749_bv1EgfiihMkEluMhEJIFZoA48y30Tgsu.jpg"
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
                        <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                The Beauty of Nature
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                It is not so much for its beauty that the forest makes a claim
                                upon men&apos;s hearts, as for that subtle something, that quality
                                of air that emanation from old trees, that so wonderfully changes
                                and renews a weary spirit.
                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white">
                                    Explore
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
        </Carousel>
    )
}



export default SliderCentralBackup