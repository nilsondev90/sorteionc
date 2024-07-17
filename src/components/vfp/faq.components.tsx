import { useState } from 'react';

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
} from "@material-tailwind/react";

interface IconProps {
    id: number;
    open: number;
}

function Icon({ id, open }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const FAQ = () => {
    const [open, setOpen] = useState<number>(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <div className='pl-5 pr-5 bg-black/75'>
            <Typography  variant="h2" className="mb-4 mt-4 text-gray-500">
                Perguntas Frequentes
            </Typography>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)} className="text-gray-500 hover:text-blue-500">Pergunta 01?</AccordionHeader>
                <AccordionBody className="text-gray-500">
                    Resposta 01
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)} className="text-gray-500 hover:text-blue-500">
                    Pergunta 02?
                </AccordionHeader>
                <AccordionBody className="text-gray-500">
                    Resposta 02
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(3)} className="text-gray-500 hover:text-blue-500">
                    Pergunta 03?
                </AccordionHeader>
                <AccordionBody className="text-gray-500">
                    Resposta 03
                </AccordionBody>
            </Accordion>
        </div>
    );
}

export default FAQ;
