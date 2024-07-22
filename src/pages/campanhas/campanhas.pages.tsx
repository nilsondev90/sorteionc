import React, { useState, useEffect, useMemo } from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TicketIcon, GiftIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tooltip,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody
} from "@material-tailwind/react";
import { collection, query, where, getDocs, Query, DocumentData } from "firebase/firestore"; // Certifique-se de ter o import correto do Firestore
import { db } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import CadastroCampanhaDialog from './cadastrocampanhadialog.pages';

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

const TABLE_HEAD = ["Nome", "Participantes", "Status", "Data", "Inicio", "Final", ""];

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Format date to dd/mm/yyyy
};

type SortKey = 'nome' | 'participantes' | 'status' | 'dataCadastro' | 'dataInicio' | 'dataFinal';

const Campanhas = () => {
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const [campanhas, setCampanhas] = useState<{ nome: string, participantes: number, status: string, dataCadastro: string, dataInicio: string, dataFinal: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: 'ascending' | 'descending' } | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [openCadastroCampanha, setOpenCadastroCampanha] = useState(false);

    const fetchCampanhas = async () => {
        setLoading(true);
        let campanhasData: { nome: string, participantes: number, status: string, dataCadastro: string, dataInicio: string, dataFinal: string }[] = [];
        let campanhasRef: Query<DocumentData> = collection(db, "campanhas");

        if (selectedTab === "ativadas") {
            campanhasRef = query(campanhasRef, where("status", "==", "Ativado"));
        } else if (selectedTab === "desativadas") {
            campanhasRef = query(campanhasRef, where("status", "==", "Desativado"));
        }

        const campanhasSnapshot = await getDocs(campanhasRef);
        for (const doc of campanhasSnapshot.docs) {
            const campanhaData = doc.data();
            const nomeCampanha = doc.id; // Nome da campanha é o ID do documento
            // Conta o número de participantes
            const participantesRef = collection(db, `campanhas/${nomeCampanha}/participantes`);
            const participantesSnapshot = await getDocs(participantesRef);
            const participantesCount = participantesSnapshot.size;
            campanhasData.push({
                nome: campanhaData.nome,
                participantes: participantesCount,
                status: campanhaData.status,
                dataCadastro: campanhaData.dataCadastro,
                dataInicio: campanhaData.dataInicio,
                dataFinal: campanhaData.dataFinal
            });
        }
        setCampanhas(campanhasData);
        setTotalPages(Math.ceil(campanhasData.length / 10));
        setLoading(false);
    };

    useEffect(() => {
        fetchCampanhas();
    }, [selectedTab]);

    const sortedCampanhas = useMemo(() => {
        let sortableCampanhas = [...campanhas];
        if (sortConfig !== null) {
            sortableCampanhas.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCampanhas.slice((currentPage - 1) * 10, currentPage * 10);
    }, [campanhas, sortConfig, currentPage]);

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        setCurrentPage(1); // Reset page to 1 when changing tab
    };

    const handleSort = (key: SortKey) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        let campanhasRef: Query<DocumentData> = collection(db, "campanhas");
        if (selectedTab === "ativadas") {
            campanhasRef = query(campanhasRef, where("status", "==", "Ativado"));
        } else if (selectedTab === "desativadas") {
            campanhasRef = query(campanhasRef, where("status", "==", "Desativado"));
        }

        const campanhasSnapshot = await getDocs(campanhasRef);
        const campanhasData: { nome: string, participantes: number, status: string, dataCadastro: string, dataInicio: string, dataFinal: string }[] = [];

        for (const doc of campanhasSnapshot.docs) {
            const campanhaData = doc.data();
            const nomeCampanha = doc.id; // Nome da campanha é o ID do documento
            // Conta o número de participantes
            const participantesRef = collection(db, `campanhas/${nomeCampanha}/participantes`);
            const participantesSnapshot = await getDocs(participantesRef);
            const participantesCount = participantesSnapshot.size;
            if (campanhaData.nome.toLowerCase().includes(term)) {
                campanhasData.push({
                    nome: campanhaData.nome,
                    participantes: participantesCount,
                    status: campanhaData.status,
                    dataCadastro: campanhaData.dataCadastro,
                    dataInicio: campanhaData.dataInicio,
                    dataFinal: campanhaData.dataFinal
                });
            }
        }
        setCampanhas(campanhasData);
        setTotalPages(Math.ceil(campanhasData.length / 10));
    };

    const handlePagination = (direction: 'next' | 'previous') => {
        setCurrentPage(prevPage => {
            if (direction === 'next' && prevPage < totalPages) {
                return prevPage + 1;
            }
            if (direction === 'previous' && prevPage > 1) {
                return prevPage - 1;
            }
            return prevPage;
        });
    };

    const handleOpenCadastroCampanha = () => {
        setOpenCadastroCampanha(!openCadastroCampanha);
    };

    // Função callback para atualizar campanhas após o cadastro
    const handleCadastroSuccess = () => {
        fetchCampanhas();
        handleOpenCadastroCampanha(); // Fecha o diálogo após o sucesso
    };
    
    return (
        <Card className="h-full w-full">
            <Dialog open={openCadastroCampanha} size="xs" handler={handleOpenCadastroCampanha}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Cadastro de Campanha
                        </Typography>
                    </DialogHeader>
                    <svg
                        className="h-5 w-5 cursor-pointer text-gray-600 transition duration-150 ease-in-out hover:text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={handleOpenCadastroCampanha}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <DialogBody divider>
                    <CadastroCampanhaDialog onSuccess={handleCadastroSuccess} />
                </DialogBody>
            </Dialog>
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
                        <Button className="flex items-center gap-3" size="sm" onClick={handleOpenCadastroCampanha}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Adicionar Campanha
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex gap-2">
                        {TABS.map(({ label, value }) => (
                            <Button
                                key={value}
                                className={`flex items-center gap-3 ${selectedTab === value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                size="sm"
                                onClick={() => handleTabChange(value)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <div className="w-full md:w-72">
                        <Input
                            crossOrigin=""
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <Typography variant="small" color="blue-gray">
                            Carregando dados...
                        </Typography>
                    </div>
                ) : (
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                        onClick={() => handleSort(head.toLowerCase() as SortKey)}
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}
                                            {sortConfig && sortConfig.key === head.toLowerCase() ? (
                                                <ChevronUpDownIcon
                                                    strokeWidth={2}
                                                    className={`h-4 w-4 ${sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`}
                                                />
                                            ) : (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                            <tbody>
                                {sortedCampanhas.map(({ nome, participantes, status, dataCadastro, dataInicio, dataFinal }, index) => {
                                    const isLast = index === sortedCampanhas.length - 1;
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
                                                    {formatDate(dataCadastro)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {formatDate(dataInicio)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {formatDate(dataFinal)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Editar Campanha">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => window.open(`/editar/${nome}`, '_blank')}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Ver Participantes">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => window.open(`/participantes/${nome}`, '_blank')}
                                                    >
                                                        <UserPlusIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Sortear">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => window.open(`/sorteio/${nome}`, '_blank')}
                                                    >
                                                        <TicketIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Ganhadores">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => window.open(`/ganhadores/${nome}`, '_blank')}
                                                    >
                                                        <GiftIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                    </table>
                )}
            </CardBody>
            <CardFooter className="flex items-center justify-between py-3 px-5">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Página {currentPage} de {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handlePagination('previous')}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => handlePagination('next')}
                        disabled={currentPage === totalPages}
                    >
                        Próximo
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Campanhas;
