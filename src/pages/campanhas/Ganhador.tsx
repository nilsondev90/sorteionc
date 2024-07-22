import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { Typography, Button } from "@material-tailwind/react";
import confetti from 'canvas-confetti';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // Importando ícones

interface Participante {
    nome: string;
    whatsapp: string;
    instagram: string;
    email: string;
}

const Ganhador: React.FC = () => {
    const { nomeCampanha, idGanhador } = useParams<{ nomeCampanha: string; idGanhador: string }>();
    const [ganhador, setGanhador] = useState<Participante | null>(null);
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showInstagram, setShowInstagram] = useState(true);
    const [confettiTriggered, setConfettiTriggered] = useState(false);

    useEffect(() => {
        const fetchGanhador = async () => {
            if (!nomeCampanha || !idGanhador) {
                console.error('Nome da campanha ou ID do ganhador não fornecido.');
                return;
            }

            try {
                const ganhadorRef = doc(db, `campanhas/${nomeCampanha}/ganhadores/${idGanhador}`);
                const ganhadorDoc = await getDoc(ganhadorRef);

                if (ganhadorDoc.exists()) {
                    setGanhador(ganhadorDoc.data() as Participante);
                } else {
                    console.log("Ganhador não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar o ganhador:", error);
            }
        };

        fetchGanhador();
    }, [nomeCampanha, idGanhador]);

    useEffect(() => {
        if (ganhador && (showWhatsapp || showEmail || showInstagram)) {
            if (!confettiTriggered) {
                triggerConfetti();
                setConfettiTriggered(true);
            }
        }
    }, [ganhador, showWhatsapp, showEmail, showInstagram]);

    const toggleVisibility = (field: string) => {
        if (field === 'whatsapp') {
            setShowWhatsapp(!showWhatsapp);
        } else if (field === 'email') {
            setShowEmail(!showEmail);
        } else if (field === 'instagram') {
            setShowInstagram(!showInstagram);
        }
    };

    const triggerConfetti = () => {
        const numExplosions = 20;
        const interval = 500; // Intervalo de 0.5 segundos (500 ms)

        for (let i = 0; i < numExplosions; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: Math.random(), y: Math.random() },
                    colors: ['#6a0dad', '#8a2be2', '#9370db', '#9b30ff', '#ba55d3']
                });
            }, i * interval);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {ganhador ? (
                <div className="text-center mb-4">
                    <Typography variant="h4" color="purple" className="mb-2">
                        Ganhador
                    </Typography>
                    <Typography variant="h1" color="purple" className="mb-2">
                        {ganhador.nome}
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="mb-1 flex items-center gap-2">
                        <Button onClick={() => toggleVisibility('instagram')} className="mr-2 p-0" aria-label={showInstagram ? "Ocultar Instagram" : "Mostrar Instagram"}>
                            {showInstagram ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                        </Button>
                        <i className="fa fa-instagram" />
                        {showInstagram ? (
                            <a
                                href={`https://instagram.com/${ganhador.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline ml-2"
                            >
                                {ganhador.instagram}
                            </a>
                        ) : (
                            <span className="ml-2">{ganhador.instagram.replace(/./g, '*')}</span>
                        )}
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="mb-1 flex items-center gap-2">
                        <Button onClick={() => toggleVisibility('whatsapp')} className="mr-2 p-0" aria-label={showWhatsapp ? "Ocultar WhatsApp" : "Mostrar WhatsApp"}>
                            {showWhatsapp ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                        </Button>
                        <i className="fa fa-whatsapp" />
                        {showWhatsapp ? (
                            <a
                                href={`https://wa.me/${ganhador.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline ml-2"
                            >
                                {ganhador.whatsapp}
                            </a>
                        ) : (
                            <span className="ml-2">{ganhador.whatsapp.replace(/./g, '*')}</span>
                        )}
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="mb-1 flex items-center gap-2">
                        <Button onClick={() => toggleVisibility('email')} className="mr-2 p-0" aria-label={showEmail ? "Ocultar Email" : "Mostrar Email"}>
                            {showEmail ? <EyeSlashIcon className="w-5 h-5 text-gray-600" /> : <EyeIcon className="w-5 h-5 text-gray-600" />}
                        </Button>
                        <i className="fa fa-envelope" />
                        {showEmail ? (
                            <a
                                href={`mailto:${ganhador.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline ml-2"
                            >
                                {ganhador.email}
                            </a>
                        ) : (
                            <span className="ml-2">{ganhador.email.replace(/./g, '*')}</span>
                        )}
                    </Typography>
                </div>
            ) : (
                <Typography variant="lead" color="blue-gray">
                    Carregando informações do ganhador...
                </Typography>
            )}
        </div>
    );
};

export default Ganhador;
