import React, { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';

const TABS = [
    {
        label: "Todas",
        value: "all",
    },
    {
        label: "Ativadas",
        value: "ativadas",
    },
    {
        label: "Desativadas",
        value: "desativadas",
    },
];

const TABLE_HEAD = ["Nome", "Participantes", "Status", "Data", ""];

const Campanhas = () => {
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const [campanhas, setCampanhas] = useState<{ nome: string, participantes: number, status: string, data: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampanhas = async () => {
            let campanhasData: { nome: string, participantes: number, status: string, data: string }[] = [];
            const campanhasRef = collection(db, "campanhas");
            const campanhasSnapshot = await getDocs(campanhasRef);
            for (const doc of campanhasSnapshot.docs) {
                const campanhaData = doc.data();
                const nomeCampanha = doc.id; // Nome da campanha é o ID do documento
                // Conta o número de participantes
                const participantesRef = collection(db, `campanhas/${nomeCampanha}/participantes`);
                const participantesSnapshot = await getDocs(participantesRef);
                const participantesCount = participantesSnapshot.size;
                campanhasData.push({
                    nome: campanhaData.nome as string,
                    participantes: participantesCount,
                    status: campanhaData.status as string,
                    data: campanhaData.data as string
                });
            }
            setCampanhas(campanhasData);
        };

        fetchCampanhas();
    }, []);

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
    };

    const handleViewParticipants = (nome: string) => {
        navigate(`/participantes/${encodeURIComponent(nome)}`);
    };

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Campanhas
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Todas as campanhas
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            Ver Todos
                        </Button>
                        <Button className="flex items-center gap-3" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Adicionar Campanha
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value={selectedTab} onChange={handleTabChange} className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            crossOrigin=""
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {campanhas.map(({ nome, participantes, status, data }, index) => {
                            const isLast = index === campanhas.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={nome}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {nome}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {participantes}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={status}
                                                color={status === "Ativado" ? "green" : "blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {data}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Editar Campanha">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Ver Participantes">
                                            <IconButton
                                                variant="text"
                                                onClick={() => handleViewParticipants(nome)}
                                            >
                                                <UserPlusIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Sortear">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Página 1 de 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Anterior
                    </Button>
                    <Button variant="outlined" size="sm">
                        Próximo
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Campanhas;
