import React from "react";
import {
    Button,
    Input,
    Typography,
    Spinner,
    Alert,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { UserPlusIcon } from "@heroicons/react/24/solid";

interface CadastroCampanhaForm {
    nome: string;
    status: "Ativado" | "Desativado";
    dataInicio: string;
    dataFinal: string;
}

interface CadastroCampanhaDialogProps {
    onSuccess: () => void;
}

const CadastroCampanhaDialog = ({ onSuccess }: CadastroCampanhaDialogProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CadastroCampanhaForm>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmitPress: SubmitHandler<CadastroCampanhaForm> = async (data) => {
        try {
            setIsLoading(true);
            const campanhaRef = doc(db, "campanhas", data.nome);
            await setDoc(campanhaRef, {
                nome: data.nome,
                status: data.status,
                dataInicio: data.dataInicio,
                dataFinal: data.dataFinal,
                dataCadastro: new Date().toISOString(),
                participantes: 0
            });
            console.log("Cadastro de campanha realizado com sucesso!");
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onSuccess(); // Fechar o diálogo
            }, 2000);
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
                <Alert
                    icon={<UserPlusIcon />}
                    className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                >
                    Campanha cadastrada com sucesso!
                </Alert>
            )}
            {isLoading && <div className="flex justify-center items-center"><Spinner className="h-6 w-6" /></div>}

            <form id="formCadastroCampanha" onSubmit={handleSubmit(handleSubmitPress)}>
                <CardBody>
                    <div className="flex items-center justify-center">
                        <div className="w-full">
                            <div className="mb-2">
                                <Input
                                    crossOrigin=""
                                    label="Nome"
                                    icon={<i className="fa fa-campaign" />}
                                    {...register("nome", { required: "Nome é obrigatório" })}
                                />
                                {errors.nome && (
                                    <Typography variant="small" color="red" className="mt-1">
                                        {errors.nome.message}
                                    </Typography>
                                )}
                            </div>
                            <div className="mb-2">
                                <select
                                    id="status"
                                    {...register("status", { required: "Status é obrigatório" })}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                >
                                    <option value="">Selecione um status</option>
                                    <option value="Ativado">Ativado</option>
                                    <option value="Desativado">Desativado</option>
                                </select>
                                {errors.status && (
                                    <Typography variant="small" color="red" className="mt-1">
                                        {errors.status.message}
                                    </Typography>
                                )}
                            </div>
                            <div className="mb-2">
                                <Input
                                    crossOrigin=""
                                    type="date"
                                    label="Data de Início"
                                    {...register("dataInicio", { required: "Data de início é obrigatória" })}
                                />
                                {errors.dataInicio && (
                                    <Typography variant="small" color="red" className="mt-1">
                                        {errors.dataInicio.message}
                                    </Typography>
                                )}
                            </div>
                            <div className="mb-2">
                                <Input
                                    crossOrigin=""
                                    type="date"
                                    label="Data Final"
                                    {...register("dataFinal", { required: "Data final é obrigatória" })}
                                />
                                {errors.dataFinal && (
                                    <Typography variant="small" color="red" className="mt-1">
                                        {errors.dataFinal.message}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        ripple={false}
                        fullWidth
                        className="bg-green-800 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </CardFooter>
            </form>
        </>
    );
};
export default CadastroCampanhaDialog;