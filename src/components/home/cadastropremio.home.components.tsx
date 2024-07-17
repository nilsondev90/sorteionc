import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

const CadastroPremio = () => {
    return (
        <div className="mt-12 flex flex-col items-center justify-center py-4">
            <Card className="w-96">
                <CardBody>
                    <div className="mb-4 flex items-center justify-center">
                        <Typography variant="h5" color="blue-gray" className="">
                            Preencha os campos e participe!
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <div className="mb-2">
                            <Input crossOrigin="" label="Nome" icon={<i className="fa fa-user" />} />
                        </div>
                        <div className="mb-2">
                            <Input crossOrigin="" label="WhatsApp" icon={<i className="fa fa-whatsapp" />} />
                        </div>
                        <div className="mb-2">
                            <Input crossOrigin="" label="Instagram" icon={<i className="fa fa-instagram" />} />
                        </div>
                        <div className="mb-2">
                            <Input crossOrigin="" label="E-mail" icon={<i className="fa fa-envelope" />} />
                        </div>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                            4 Atendimentos
                        </Typography>
                        <Typography color="green" className="font-medium">
                            Concorrer Grátis
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal opacity-75"
                    >
                        Basta preencher todos os campos e você já estará participando do sorteio de 1 mês grátis que equivale a 4 atendimentos de forma remota ou presencial.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        ripple={false}
                        fullWidth={true}
                        className="bg-green-800 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        Cadastrar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CadastroPremio