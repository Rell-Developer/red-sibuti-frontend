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

// Componente
const ForgetPassForm = ({title}) => {
    // States
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(false);

    // Declaracion del useNavigate
    const navigate = useNavigate();

    // Funciones
    const handleSubmit = async (e) => {
        // Prevenir la accion del formulario
        e.preventDefault();
        // Validacion
        if ([email].includes('')) {
            setAlerta({ error: true, message:'El campo de correo electronico es obligatorio' });
            return setTimeout(() => setAlerta(null), 5000)
        }

        // Aparicion del spinner
        setLoading(true);

        setTimeout(async() => {
            // Creacion de la peticion http
            try {
                // peticion http de autenticacion
                const { data } = await clienteAxios.post('/user/forget-password', { email });
    
                // Se quita el spinner
                setLoading(false);
                // Validacion si hay un error
                if (data.error) {
                    // Se llama la alerta para mostrar el mensaje
                    setAlerta({ error: true, message: data.message});
                    // Y se retorna la asignacion nula de la alerta para que desaparezca
                    return setTimeout(() => setAlerta(null), 5000)
                }

                setAlerta({error:false, message: data.message});

                setTimeout(() => navigate("/"), 10000);
            } catch (error) {
                console.log(error.message);
            }
        }, 3000);
    }

    // Retorno
    return (
        <>
            {loading ? (
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

                        {/* Footer */}
                        <div className="flex flex-col my-5">
                            <div className='flex justify-between my-5'>
                                <FooterLink 
                                    url={"/"} 
                                    phrase={"¿Ya tienes una cuenta?, "} 
                                    linkPhrase={"Haz clic aquí"} 
                                    classPhrase={"text-color4 font-bold"}
                                />

                                <FooterLink 
                                    url={"/registrarse"} 
                                    phrase={"¿No tienes cuenta?, "} 
                                    linkPhrase={"Haz clic aquí"} 
                                    classPhrase={"text-color4 font-bold"}
                                />
                            </div>
                            <div className='w-1/2 mx-auto my-5'>
                                <ButtonSubmit 
                                    customClasses={"bg-color3 rounded-lg border-2 border-color4 text-white font-bold w-full my-3 shadow-lg uppercase mx-auto py-2 text-sm"} 
                                    title={"Enviar"} 
                                    disabled={`${loading || alerta ? "true":"false"}`}
                                />
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
// Importacion del componente
export default ForgetPassForm