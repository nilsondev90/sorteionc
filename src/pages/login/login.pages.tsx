// Firebase
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../config/firebase.config';
// Utilities
import { useAppSelector } from '../../hooks/redux.hooks'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

// React
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icones
import { BsGoogle } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { UserContext } from '../../contexts/user.contexts';

import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { Header } from '../../components/header/header.component';
import Header2 from '../../components/header/header2.component';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        formState: { errors },
        setError,
        handleSubmit
    } = useForm<LoginForm>();

    const [isLoading, setIsLoading] = useState(false);

    // Se o usuário está autenticado ou não
    //const { isAuthenticated } = useContext(UserContext);

    const { isAuthenticated } = useAppSelector(
        (rootReducer) => rootReducer.userReducer
    )

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirecionar para Home
        }
    }, [isAuthenticated, navigate]);

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    const handleSubmitPress = async (data: LoginForm) => {
        try {
            setIsLoading(true)

            const userCredentials = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            console.log({ userCredentials })
        } catch (error) {
            const _error = error as AuthError

            if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
                return setError('password', { type: 'mismatch' })
            }

            if (_error.code === AuthErrorCodes.USER_DELETED) {
                return setError('email', { type: 'notFound' })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInWithGooglePress = async () => {
        try {
            setIsLoading(true)

            const userCredentials = await signInWithPopup(auth, googleProvider)

            const querySnapshot = await getDocs(
                query(
                    collection(db, 'users'),
                    where('id', '==', userCredentials.user.uid)
                )
            )

            const user = querySnapshot.docs[0]?.data()

            if (!user) {
                const firstName = userCredentials.user.displayName?.split(' ')[0]
                const lastName = userCredentials.user.displayName?.split(' ')[1]

                await addDoc(collection(db, 'users'), {
                    id: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    firstName,
                    lastName,
                    provider: 'google'
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <Header2 />
            <div className='flex justify-center items-center'>
                <div className="max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">{/*  */}
                    <CardBody className="flex flex-col gap-4">
                        <Button
                            onClick={handleSignInWithGooglePress}
                            size="lg"
                            variant="outlined"
                            color="blue-gray"
                            className="flex justify-center gap-3"
                        >
                            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-6 w-6" />
                            Entrar com Google
                        </Button>
                    </CardBody>
                    <Typography variant="small" className="flex justify-center">
                        Ou preencha os campos.
                    </Typography>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            {...register('email', {
                                required: true,
                                validate: (value) => validator.isEmail(value)
                            })}
                            crossOrigin="false"
                            label="Email"
                            size="lg"
                        />
                        <Input
                            {...register('password', { required: true })}
                            crossOrigin="false"
                            label="Senha"
                            size="lg"
                            type="password"
                        />
                        {/*                     <div className="-ml-2.5">
                        <Checkbox crossOrigin="" label="Lembrar-me" />
                    </div> */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={() => handleSubmit(handleSubmitPress)()} variant="gradient" fullWidth>
                            Entrar
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Não tem conta?
                            <Typography
                                as="a"
                                onClick={handleSignUpClick}
                                href="/sign-up"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Criar conta
                            </Typography>
                        </Typography>
                    </CardFooter>
                </div>
            </div>
        </>

    );
};

export default LoginPage;
