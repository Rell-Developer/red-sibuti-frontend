// Importaciones
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import InputForm from './InputForm.jsx';
import Alert from './Alert.jsx';
import FooterLink from './FooterLink.jsx';
import ButtonSubmit from './ButtonComponent.jsx';
import Spinner from './Spinner.jsx';

// Cliente Axios
import clienteAxios from '../../config/axios.jsx';

// Login
const LoginForm = ({title}) => {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(false);

    // Declaracion del useNavigate
    const navigate = useNavigate();

    // Funciones
    const handleSubmit = async (e) => {
        // Prevenir la accion del formulario
        e.preventDefault();
        // Validacion
        if ([email, password].includes('')) {
            setAlerta({ error: true, message:'Todos los campos son obligatorios' })
            return setTimeout(() => setAlerta(null), 5000)
        }

        // Activando animacion de carga
        setLoading(true);

        setTimeout(async() => {
            // Creacion de la peticion http
            try {
                // peticion http de autenticacion
                const { data } = await clienteAxios.post('/auth', { email, password});
    
                // Validacion si hay un error
                if (data.error) {
                    // Quitando el spinner
                    setLoading(false);
                    // Se llama la alerta para mostrar el mensaje
                    setAlerta({ error: true, message: data.message});
                    // Y se retorna la asignacion nula de la alerta para que desaparezca
                    return setTimeout(() => setAlerta(null), 5000)
                }

                sessionStorage.setItem("user", JSON.stringify(data.data));
                // Se envia al usuario a la pagina principal
                navigate("/inicio");
            } catch (error) {
                console.log(error.message);
            }
        }, 1500);
    }

    // Retorno
    return (
        <>
            { loading ? (
                    <>
                        <Spinner message='Cargando...'/>
                    </>
                ):(
                    <>
                        <form onSubmit={handleSubmit} className='w-2/3 mx-auto'>

                            <h2 className='text-center text-5xl font-bold'>{title}</h2>
                            { alerta && <Alert alerta={alerta}/>}
                            
                            {/* Input del email */}
                            <InputForm props={{ 
                                classes:{
                                    divClasses:'flex flex-col my-5',
                                    labelClasses:'font-bold text-xl',
                                    inputClasses:'rounded-xl p-4 border-2 border-black mt-2 shadow-md'
                                },
                                inputType:'email',
                                labelText:'Corrreo Electronico',
                                stateValue:email,
                                setState:setEmail,
                                placeholder:'Ingrese su correo electronico',
                            }}/>

                            {/* Input de la contraseña  */}
                            <InputForm props={{ 
                                classes:{
                                    divClasses:'flex flex-col my-5',
                                    labelClasses:'font-bold text-xl',
                                    inputClasses:'rounded-xl p-4 border-2 border-black mt-2 shadow-md'
                                },
                                inputType:'password',
                                labelText:'Contraseña',
                                stateValue:password,
                                setState:setPassword,
                                placeholder:'Ingrese su contraseña',
                            }}/>

                            {/* Footer */}
                            <div className="flex flex-col my-5">
                                <div className='flex justify-between my-5'>
                                    <FooterLink 
                                        url={"/registrarse"} 
                                        phrase={"¿No tienes una cuenta?, "} 
                                        linkPhrase={"Haz clic aquí"} 
                                        classPhrase={"text-color4 font-bold"}
                                    />

                                    <FooterLink 
                                        url={"/olvide-contrasena"} 
                                        phrase={"¿Olvidaste tu contraseña?, "} 
                                        linkPhrase={"Haz clic aquí"} 
                                        classPhrase={"text-color4 font-bold"}
                                    />
                                </div>
                                <div className='w-1/2 mx-auto my-5'>
                                    <ButtonSubmit customClasses={"bg-color3 rounded-lg border-2 border-color4 text-white font-bold w-full my-3 shadow-lg uppercase mx-auto py-2 text-sm"} title={"Iniciar"}/>
                                </div>
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}

// Exportar por defecto
export default LoginForm;