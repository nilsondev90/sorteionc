import React, { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { useParams } from 'react-router-dom';

const Ganhadores = () => {
    const { nomeCampanha } = useParams<{ nomeCampanha: string }>();
    const [ganhadores, setGanhadores] = useState<{ nome: string, instagram: string, whatsapp: string, email: string }[]>([]);

    useEffect(() => {
        const fetchGanhadores = async () => {
            if (!nomeCampanha) {
                console.error('Nome da campanha não fornecido.');
                return;
            }

            let ganhadoresData: { nome: string, instagram: string, whatsapp: string, email: string }[] = [];
            const ganhadoresRef = collection(db, `campanhas/${nomeCampanha}/ganhadores`);
            const ganhadoresSnapshot = await getDocs(ganhadoresRef);

            ganhadoresSnapshot.forEach(doc => {
                const ganhadorData = doc.data();
                ganhadoresData.push({
                    nome: ganhadorData.nome as string,
                    instagram: ganhadorData.instagram as string,
                    whatsapp: ganhadorData.whatsapp as string,
                    email: ganhadorData.email as string
                });
            });

            setGanhadores(ganhadoresData);
        };

        fetchGanhadores();
    }, [nomeCampanha]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Ganhadores
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Lista de ganhadores para a campanha {nomeCampanha}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Nome
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    WhatsApp
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Instagram
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ganhadores.map((ganhador, index) => {
                            const isLast = index === ganhadores.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <UserIcon className="h-5 w-5" />
                                            {ganhador.nome}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`https://wa.me/${ganhador.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-whatsapp" />
                                            {ganhador.whatsapp}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`https://instagram.com/${ganhador.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-instagram" />
                                            {ganhador.instagram}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`mailto:${ganhador.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-envelope" />
                                            {ganhador.email}
                                        </a>
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

export default Ganhadores;
