// Importaciones
import React from 'react'

// Componentes
import LoginForm from '../../components/public/LoginForm.jsx';
import RegisterForm from '../../components/public/RegisterForm.jsx';
import CoverComponent from '../../components/public/CoverComponent.jsx';
import ForgetPassForm from '../../components/public/ForgetPassForm.jsx';
import ConfirmAccount from '../../components/public/ConfirmAccount.jsx';

// Funcion
const JoinLayout = ({section, view}) => {
    console.log(view);
    return (
        <>
            <main className='flex w-full h-full'>
                { section === "signin" || section === "forgot-password" ? (
                        <>
                            <CoverComponent
                                props={{
                                    divClass:'w-1/2 flex flex-col items-center justify-around',
                                    heightVH: '100vh',
                                    bgClass:`bg-img-config bg-img${view === "common" ? "":"-company"}-login`,
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
                            <div className='w-1/2 bg-color1 h-full flex justify-center items-center' style={{height:'100vh'}}>
                            {
                                section === "confirm-account" ? (
                                    <>
                                        {/* Confirmar token */}
                                        <ConfirmAccount/>
                                    </>
                                ):(
                                    <>
                                        {/* Formulario */}
                                        <RegisterForm title={"REGISTRARSE"} view={view}/>
                                    </>
                                )
                            }
                            </div>
                            <CoverComponent
                                props={{
                                    divClass:'w-1/2 flex flex-col items-center justify-around',
                                    heightVH: '100vh',
                                    bgClass:`bg-img-config bg-img${view === "common" ? "":"-company"}-register`,
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