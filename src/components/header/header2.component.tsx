import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";

import LogoNiceCoimbra from '../../assets/logo_nice_coimbra.svg';

import { useDispatch } from 'react-redux'

import { useContext } from 'react'
import { UserContext } from '../../contexts/user.contexts'

import { useAppSelector } from '../../hooks/redux.hooks'

// Firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

import { logoutUser } from '../../store/toolkit/user/user.slice'


const Header2 = () => {

    // Verificar se o usuário está autenticado
    const { isAuthenticated } = useAppSelector(
        (rootReducer) => rootReducer.userReducer
    )

    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate('/')
    }

    const handleLogout = () => {
        const dispatch = useDispatch();
        const handleItemClick = () => {
            dispatch(logoutUser());
            signOut(auth);
            console.log("Usuário Desconectado!")
        };
        handleItemClick();
    }

    const handleMetodoVFP = () => {
        navigate('/metodovfp')
    }

    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" onClick={handleLogoClick} className="flex items-center">
                    Início
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Sobre
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Benefícios
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Depoimentos
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    FAQ
                </a>
            </Typography>
            {
                !isAuthenticated && (
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <a href="/" onClick={handleLogout} className="flex items-center">
                            Sair
                        </a>
                    </Typography>
                )}
        </ul>
    );

    return (
        <Navbar className="sticky top-0 z-10 w-full !max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blue-50">
            <div className="flex items-center justify-between w-full text-blue-gray-900">
                <Typography
                    as="a"
                    className="mr-4 cursor-pointer py-1.5 font-medium inline-flex items-center"
                    onClick={handleLogoClick}
                >
                    <img className="h-5" src={LogoNiceCoimbra} alt="Logo Nice Coimbra" />
                    <span className='pl-3'>Site</span>

                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-1">
                        <Button
                            variant="text"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Contato</span>
                        </Button>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                            onClick={handleMetodoVFP}
                        >
                            <span>Método VFP</span>
                        </Button>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">
                    <Button fullWidth variant="text" size="sm" className="">
                        <span>Contato</span>
                    </Button>
                    <Button fullWidth variant="gradient" size="sm" className="" onClick={handleMetodoVFP}>
                        <span>Método VFP</span>
                    </Button>
                </div>
            </MobileNav>
        </Navbar>
    )
}

export default Header2