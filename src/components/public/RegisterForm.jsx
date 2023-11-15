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
const RegisterForm = ({title, view}) => {

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(false);

    // Declaracion del useNavigate
    const navigate = useNavigate();

    // Controlador del submit
    const handleSubmit = async e =>{
        // Prevenir la accion del formulario
        e.preventDefault();
        // Campos que se deben evaluar a toda costa
        let inputsList = [email,password,firstName];
        // Validacion de campos
        view && view === "common" ? inputsList.push(lastName):null;
        // Validacion
        // Validacion de campos vacios
        if (inputsList.includes("")) {
            setAlerta({error:true, message:"Todos los campos son obligatorios"});
            return setTimeout(() => setAlerta(null), 5000);
        }

        // Validacion de contraseña corta
        if (password.length < 6) {
            setAlerta({error:true, message:"Por su seguridad, la contraseña debe tener más de 5 carácteres."});
            return setTimeout(() => setAlerta(null), 5000);
        }

        // Aparicion del spinner
        setLoading(true);

        setTimeout(async() => {
            // try para capturar cualquier error
            try {
                let datas = {email, password, firstName};
                if (view && view === "common") {
                    datas.lastName = lastName;
                }else{
                    datas.rol_id = "company"
                }
                // peticion http
                const { data } = await clienteAxios.post("/users", datas);   
                // Quitamos el spinner
                setLoading(false);
                // Si existe un error, muestra el mensaje
                if (data.error) {
                    setAlerta({error:true, message: data.message});
                    return setTimeout(() => setAlerta(null), 5000);
                }
    
                setAlerta({ error: false, message: "Usuario creado correctamente"});

                // Reinicio de los states
                setFirstName("");
                setEmail("");
                setPassword("");
                setLastName("");
                return setTimeout(() => setAlerta(null), 5000);
            } catch (error) {
                console.log(error.message);
            }
        }, 1500);
    }

    return (
        <>
            { loading ? (
                <>
                    <Spinner message='Cargando...'/>
                </>
            ):(
                <>
                    <form id="registerForm" onSubmit={handleSubmit} className='w-2/3 mx-auto'>
                        <h2 className='text-center text-5xl font-bold my-5'>{title}</h2>
                        { alerta && <Alert alerta={alerta}/>}

                        <div className='w-full flex justify-between'>
                            {/* Input del nombre */}
                            <InputForm props={{ 
                                classes:{
                                    divClasses:`flex flex-col my-5 ${view && view === "company"? "w-full":"w-1/2"}`,
                                    labelClasses:'font-bold text-xl',
                                    inputClasses:`rounded-xl p-4 border-2 border-black mt-2 shadow-md ${view && view === "company"? "w-full":"w-5/6"}`
                                },
                                inputType:'text',
                                labelText:'Nombre',
                                stateValue:firstName,
                                setState:setFirstName,
                                placeholder:`Ingrese ${view && view === "company" ? "el nombre de la empresa":"su primer nombre"}`,
                            }}/>

                            {
                                (!view || view === "common") && (
                                    <>
                                        {/* Input del apellido */}
                                        <InputForm props={{ 
                                            classes:{
                                                divClasses:'flex flex-col my-5 w-1/2',
                                                labelClasses:'font-bold text-xl',
                                                inputClasses:'rounded-xl p-4 border-2 border-black mt-2 shadow-md'
                                            },
                                            inputType:'text',
                                            labelText:'Apellido',
                                            stateValue:lastName,
                                            setState:setLastName,
                                            placeholder:'Ingrese su primer apellido',
                                        }}/>
                                    </>
                                )
                            }
                        </div>

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
                                    url={"/"} 
                                    phrase={"¿Ya tienes una cuenta?, "} 
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
                                {/* <button type="submit" className='bg-color4 w-full text-white font-bold p-2 rounded-lg shadow-lg hover:bg-color3 transition-all uppercase'>
                                    Registrase
                                </button> */}
                                <ButtonSubmit title={"Registrarse"}/>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
// Exportamos el componente
export default RegisterForm;