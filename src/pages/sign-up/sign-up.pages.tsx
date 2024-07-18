// Firebase
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import { auth, db, googleProvider } from '../../config/firebase.config'

// Firebase
// Utilities
import { useAppSelector } from '../../hooks/redux.hooks'

// Icons
import { FiLogIn } from 'react-icons/fi'

// Hooks React
import { useForm } from 'react-hook-form'
import validator, { isEmail } from 'validator'

// React
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../contexts/user.contexts'

import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { Header } from '../../components/header/header.component'

interface SignUpForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

const SignUpPage = () => {

    const {
        register,
        formState: { errors },
        watch,
        setError,
        handleSubmit
    } = useForm<SignUpForm>()

    const [isLoading, setIsLoading] = useState(false)

    // Se o usuário está autenticado ou não
    const { isAuthenticated } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/') // Redirecionar para Home
        }
    }, [isAuthenticated])

    const handleSubmitPress = async (data: SignUpForm) => {

        try {
            setIsLoading(true)

            const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await addDoc(collection(db, 'users'), {
                id: userCredentials.user.uid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: userCredentials.user.email,
                provider: 'firebase'
            })
        } catch (error) {
            //console.log(error)
            const _error = error as AuthError

            if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
                return setError('email', { type: 'alreadyInUse' })
            }
        } finally {
            setIsLoading(false)
        }

        //console.log(data)
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

    const watchPassowrd = watch('password')

    //console.log({errors})

    return (
        <>
            <Header />
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
                            {...register('firstName', { required: true })}
                            crossOrigin="use-credentials"
                            label="Nome"
                            size="lg"
                        />
                        <Input
                            {...register('lastName', { required: true })}
                            crossOrigin="use-credentials"
                            label="Sobrenome"
                            size="lg"
                        />
                        <Input
                            {...register('email', {
                                required: true,
                                validate: (value) => {
                                    return validator.isEmail(value)
                                }
                            })}
                            crossOrigin="use-credentials"
                            label="Email"
                            size="lg"
                        />
                        <Input
                            {...register('password', { required: true, minLength: 6 })}
                            crossOrigin="use-credentials"
                            label="Senha"
                            size="lg"
                            type="password"
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={() => handleSubmit(handleSubmitPress)()} variant="gradient" fullWidth>
                            Criar Conta
                        </Button>
                    </CardFooter>
                </div>
            </div>
        </>
    )
}

export default SignUpPage