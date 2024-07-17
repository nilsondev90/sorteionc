import { Carousel, Typography, Button, CardBody, Card } from "@material-tailwind/react";

const Escolher = () => {
    return (
        <div className="mt-5 pl-2 pr-2">
            <Card className="mt-6 rounded-xl border border-white bg-black/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <CardBody>
                    <Typography variant="h3">Por que Escolher o Método VFP?</Typography>
                    <Typography variant="paragraph">
                        Foi pensando em solucionar esses problemas e potencializar a sua
                        qualidade de vida que nasce o MÉTODO “VFP🧠💫⛓️”, que tem como
                        objetivo promover o AUTOCONHECIMENTO, viver melhor o momento presente,
                        ressignificar o passado e planejar o futuro.
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default Escolher