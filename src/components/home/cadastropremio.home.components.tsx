import React from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Spinner,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";

interface CadastroPremioForm {
    nome: string;
    whatsapp: string;
    instagram: string;
    email: string;
}

interface CadastroPremioProps {
    campanha: string;
}

const CadastroPremio: React.FC<CadastroPremioProps> = ({ campanha }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CadastroPremioForm>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const { countries } = useCountries();

    // Encontre o índice do Brasil
    const brazilIndex = countries.findIndex(country => country.name === "Brazil");
    const [country, setCountry] = React.useState(brazilIndex !== -1 ? brazilIndex : 0);
    const { countryCallingCode, flags } = countries[country];

    const handleSubmitPress = async (data: CadastroPremioForm) => {
        try {
            setIsLoading(true);
            await addDoc(collection(db, `campanhas/${campanha}/participantes`), {
                nome: data.nome,
                whatsapp: `${countryCallingCode}${data.whatsapp}`, // Adiciona o código de área
                instagram: data.instagram,
                email: data.email,
            });
            console.log("Cadastro de prêmio realizado com sucesso!");
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
            reset();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-md">
                    Cliente cadastrado com sucesso!
                </div>
            )}
            {isLoading && <div className="flex justify-center items-center"><Spinner className="h-6 w-6" /></div>}

            <div className="mt-12 flex flex-col items-center justify-center py-4">
                <Card className="w-96">
                    <form onSubmit={handleSubmit(handleSubmitPress)}>
                        <CardBody>
                            <div className="mb-4 flex items-center justify-center">
                                <Typography variant="h5" color="blue-gray" className="">
                                    Preencha os campos e participe!
                                </Typography>
                            </div>
                            <div className="mb-4">
                                <div className="mb-2">
                                    <Input
                                        crossOrigin=""
                                        label="Nome"
                                        icon={<i className="fa fa-user" />}
                                        error={!!errors.nome}
                                        {...register("nome", { required: "Nome é obrigatório" })}
                                    />
                                </div>
                                <div className="mb-2 flex">
                                    <Menu placement="bottom-start">
                                        <MenuHandler>
                                            <Button
                                                ripple={false}
                                                variant="text"
                                                color="blue-gray"
                                                className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                                            >
                                                <img
                                                    src={flags.svg}
                                                    alt={countries[country].name}
                                                    className="h-4 w-4 rounded-full object-cover"
                                                />
                                                {countryCallingCode}
                                            </Button>
                                        </MenuHandler>
                                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                                            {countries.map(({ name, flags, countryCallingCode }, index) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    className="flex items-center gap-2"
                                                    onClick={() => setCountry(index)}
                                                >
                                                    <img
                                                        src={flags.svg}
                                                        alt={name}
                                                        className="h-5 w-5 rounded-full object-cover"
                                                    />
                                                    {name} <span className="ml-auto">{countryCallingCode}</span>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                    <Input
                                        crossOrigin=""
                                        type="tel"
                                        placeholder="Número do WhatsApp"
                                        icon={<i className="fa fa-whatsapp" />}
                                        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 flex-1"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                        error={!!errors.whatsapp}
                                        {...register("whatsapp", { required: "WhatsApp é obrigatório" })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Input
                                        crossOrigin=""
                                        label="Instagram"
                                        icon={<i className="fa fa-instagram" />}
                                        error={!!errors.instagram}
                                        {...register("instagram", { required: "Instagram é obrigatório" })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Input
                                        crossOrigin=""
                                        label="E-mail"
                                        icon={<i className="fa fa-envelope" />}
                                        error={!!errors.email}
                                        {...register("email", { required: "E-mail é obrigatório" })}
                                    />
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
                                type="submit"
                                className="bg-green-800 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                                Cadastrar
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default CadastroPremio;
