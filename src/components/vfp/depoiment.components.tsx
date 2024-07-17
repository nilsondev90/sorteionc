import { useState } from "react";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    IconButton,
    Typography,
    Card,
} from "@material-tailwind/react";

const Depoiment = () => {
    const [open, setOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);
    const handleIsFavorite = () => setIsFavorite((cur) => !cur);

    return (
        <>
            <Card
                className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                onClick={handleOpen}
            >
                <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                />
            </Card>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between overscroll-y-contain">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Depoimento do Leonardo
                        </Typography>
                    </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    <img
                        alt="nature"
                        className="h-100 w-full rounded-lg object-cover object-center"
                        src="https://pbs.twimg.com/media/DohbmjQXgAAE2Gb.jpg:large"                    />
                </DialogBody>
            </Dialog>
        </>
    );
}

export default Depoiment