import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import Alert from "./Alert.jsx";
import InputForm from "./InputForm.jsx";
import ButtonSubmit from "./ButtonComponent.jsx";
import clienteAxios from "../../config/axios.jsx";

const ResetPassword = ({title}) => {
    // States
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState(null);
    const [id, setId] = useState(0);

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const searchToken = async () => {
            try {
                let {data} = await clienteAxios(`/get-user-by-token/${params.token}`); 

                if (data.error) {
                    setAlerta({error:true, message: data.message});
                    return setLoading(false);
                }

                setLoading(false);
                setAlerta(null);

                setId(data.user_id);
            } catch (error) {
                console.error(error.message);
            }
        }
        searchToken();
    }, []);

    const handleSubmit = async() => {
        try {
            setLoading(true);
            if ([password, repeatPassword].includes("")) {
                setLoading(false);
                setAlerta({error:true, message:"Todos los campos son obligatorios"});
                return setTimeout(() => setAlerta(null), 2000);
            }

            if (password.length < 6) {
                setLoading(false);
                setAlerta({error:true, message:"La contraseña debe tener más de 6 caracteres"});
                return setTimeout(() => setAlerta(null), 2000);
            }

            if (password !== repeatPassword) {
                setLoading(false);
                setAlerta({error:true, message:"Las contraseñas no coinciden."});
                return setTimeout(() => setAlerta(null), 2000);
            }

            let { data } = await clienteAxios.post("/users/reset-password", {id, password});

            setLoading(false);
            setAlerta({error: data.error,message:data.message});
            return setTimeout(() => navigate("/"), 8000);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Retorno al cliente
    return (
        <>
            {loading ? (
                <>
                    <Spinner message='Cargando...'/>
                </>
            ):(
                <>
                    {alerta ? (
                        <Alert alerta={alerta}/>
                    ):(
                        <form onSubmit={handleSubmit} className='w-2/3 mx-auto'>
                            <h2 className='text-center text-5xl font-bold'>{title}</h2>
                            
                            {/* Input de la contraseña */}
                            <InputForm props={{ 
                                classes:{
                                    divClasses:'flex flex-col my-5',
                                    labelClasses:'font-bold text-xl',
                                    inputClasses:'rounded-xl p-4 border-2 border-black mt-2 shadow-md'
                                },
                                inputType:'password',
                                labelText:'Nueva Contraseña',
                                stateValue:password,
                                setState:setPassword,
                                placeholder:'Ingrese su nueva contraseña',
                            }}/>

                            {/* Input de repetir la contraseña */}
                            <InputForm props={{ 
                                classes:{
                                    divClasses:'flex flex-col my-5',
                                    labelClasses:'font-bold text-xl',
                                    inputClasses:'rounded-xl p-4 border-2 border-black mt-2 shadow-md'
                                },
                                inputType:'password',
                                labelText:'Repita la Contraseña',
                                stateValue:repeatPassword,
                                setState:setRepeatPassword,
                                placeholder:'Ingrese nuevamente su nueva contraseña',
                            }}/>

                            {/* Footer */}
                            <div className="flex flex-col my-5">
                                <div className='w-1/2 mx-auto my-5'>
                                    <ButtonSubmit 
                                        customClasses={"bg-color3 rounded-lg border-2 border-color4 text-white font-bold w-full my-3 shadow-lg uppercase mx-auto py-2 text-sm"} 
                                        title={"Enviar"}/>
                                </div>
                            </div>
                        </form>
                    )}
                </>
            )}
        </>
    )
}

export default ResetPassword