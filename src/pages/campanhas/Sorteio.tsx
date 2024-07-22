import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { Button, Typography } from "@material-tailwind/react";

interface Participante {
    id: string;
    nome: string;
    whatsapp: string;
    instagram: string;
    email: string;
}

const Sorteio: React.FC = () => {
    const { nomeCampanha } = useParams<{ nomeCampanha: string }>();
    const navigate = useNavigate();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [ganhador, setGanhador] = useState<Participante | null>(null);
    const [isSorting, setIsSorting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState("");

    useEffect(() => {
        const fetchParticipantes = async () => {
            const participantesRef = collection(db, `campanhas/${nomeCampanha}/participantes`);
            const participantesSnapshot = await getDocs(participantesRef);
            const participantesList = participantesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Participante));
            setParticipantes(participantesList);
        };

        fetchParticipantes();
    }, [nomeCampanha]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSorting && participantes.length > 0) {
            interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % participantes.length);
            }, 50); // Atualiza a rotação a cada 50ms

            const stopSorting = async () => {
                clearInterval(interval);
                setIsSorting(false);
                setLoadingMessage("Carregando Ganhador...");

                // Espera 5 segundos para mostrar a mensagem de carregamento
                setTimeout(async () => {
                    const availableParticipantes = await getAvailableParticipantes();
                    if (availableParticipantes.length > 0) {
                        const randomIndex = Math.floor(Math.random() * availableParticipantes.length);
                        const chosenGanhador = availableParticipantes[randomIndex];
                        setGanhador(chosenGanhador);
                        await saveGanhador(chosenGanhador);
                        navigate(`/ganhador/${nomeCampanha}/${chosenGanhador.id}`);
                    } else {
                        // Limpa a mensagem de carregamento e mostra a mensagem de cancelamento
                        setLoadingMessage(""); // Limpa a mensagem de carregamento
                        setNoMoreParticipantesMessage();
                    }
                }, 5000); // 5 segundos de mensagem de carregamento
            };

            setTimeout(stopSorting, 10000); // 10 segundos de animação
        }
        return () => clearInterval(interval);
    }, [isSorting, participantes]);

    const handleSortear = () => {
        setIsSorting(true);
        setGanhador(null);
        setLoadingMessage(""); // Limpa a mensagem de carregamento
    };

    const saveGanhador = async (ganhador: Participante) => {
        try {
            const ganhadorRef = doc(db, `campanhas/${nomeCampanha}/ganhadores/${ganhador.id}`);
            await setDoc(ganhadorRef, ganhador);
        } catch (error) {
            console.error("Erro ao salvar ganhador:", error);
        }
    };

    const getAvailableParticipantes = async (): Promise<Participante[]> => {
        const ganhadoresRef = collection(db, `campanhas/${nomeCampanha}/ganhadores`);
        const ganhadoresSnapshot = await getDocs(ganhadoresRef);
        const ganhadoresIds = new Set(ganhadoresSnapshot.docs.map(doc => doc.id));

        return participantes.filter(participante => !ganhadoresIds.has(participante.id));
    };

    const setNoMoreParticipantesMessage = () => {
        setLoadingMessage("Campanha cancelada! Todos os participantes já foram sorteados");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Typography variant="h4" color="blue-gray" className="mb-4">
                Sorteio da Campanha: {nomeCampanha}
            </Typography>
            <div className="h-12 w-64 flex items-center justify-center border border-gray-300 rounded-lg mb-4">
                {loadingMessage ? (
                    <div className="w-full flex items-center justify-center">
                        <Typography variant="h4" color="blue-gray" className="text-center px-4">
                            {loadingMessage}
                        </Typography>
                    </div>
                ) : (
                    <Typography variant="lead" color="blue-gray">
                        {isSorting ? participantes[currentIndex]?.nome : "O ganhador pode ser você"}
                    </Typography>
                )}
            </div>
            <Button onClick={handleSortear} disabled={isSorting}>
                Sortear agora
            </Button>
        </div>
    );
};

export default Sorteio;
