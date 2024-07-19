import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

const Participantes = () => {
    const { nome } = useParams();
    const [participantes, setParticipantes] = useState<any[]>([]);

    useEffect(() => {
        const fetchParticipantes = async () => {
            if (nome) {
                const participantesRef = collection(db, `campanhas/${nome}/participantes`);
                const participantesSnapshot = await getDocs(participantesRef);
                const participantesData = participantesSnapshot.docs.map(doc => doc.data());
                setParticipantes(participantesData);
            }
        };

        fetchParticipantes();
    }, [nome]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Participantes - {nome}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Lista de participantes da campanha
                        </Typography>
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
                        {participantes.map((participante, index) => {
                            const isLast = index === participantes.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <a
                                            href={`#`} // No link de âncora apenas para exemplo
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-user" />
                                            {participante.nome}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`https://wa.me/${participante.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-whatsapp" />
                                            {participante.whatsapp}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`https://instagram.com/${participante.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-instagram" />
                                            {participante.instagram}
                                        </a>
                                    </td>
                                    <td className={classes}>
                                        <a
                                            href={`mailto:${participante.email}`}
                                            className="flex items-center gap-2 text-blue-500 hover:underline"
                                        >
                                            <i className="fa fa-envelope" />
                                            {participante.email}
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default Participantes;
