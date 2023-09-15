// Importaciones
import React from 'react'

// Componentes
import LoginForm from '../../components/public/LoginForm.jsx';
import RegisterForm from '../../components/public/RegisterForm.jsx';
import CoverComponent from '../../components/public/CoverComponent.jsx';
import ForgetPassForm from '../../components/public/ForgetPassForm.jsx';

// Funcion
const JoinLayout = ({section}) => {
    return (
        <>
            <main className='flex w-full h-full'>
                { section === "signin" || section === "forgot-password" ? (
                        <>
                            <CoverComponent
                                props={{
                                    divClass:'w-1/2 flex flex-col items-center justify-around',
                                    heightVH: '100vh',
                                    bgClass:'bg-img-config bg-img-login',
                                }}
                            />
                            {/* Formulario */}
                            <div className='w-1/2 bg-color1 h-full flex justify-center items-center' style={{height:'100vh'}}>
                                {
                                    section === "signin" ? (
                                        <LoginForm title={"INICIAR SESION"}/>
                                    ):(
                                        <ForgetPassForm title={"RECUPERAR CONTRASEÑA"}/>
                                    )
                                }
                            </div>
                        </>
                    ):
                    (
                        <>
                            {/* Formulario */}
                            <div className='w-1/2 bg-color1 h-full flex justify-center items-center' style={{height:'100vh'}}>
                                <RegisterForm title={"REGISTRARSE"}/>
                            </div>
                            <CoverComponent
                                props={{
                                    divClass:'w-1/2 flex flex-col items-center justify-around',
                                    heightVH: '100vh',
                                    bgClass:'bg-img-config bg-img-register',
                                }}
                            />
                        </>
                    )
                }
            </main>
        </>
    )
}

// Retorno por defecto
export default JoinLayout;