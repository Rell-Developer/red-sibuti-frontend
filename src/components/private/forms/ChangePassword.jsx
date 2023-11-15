// Importaciones
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clienteAxios from '../../../config/axios.jsx';
import Alert from '../../public/Alert.jsx';

// Componente
const ChangePassword = ({user, profileObj}) => {

    console.log(profileObj);
    // Declaracion del hook
    const { register, handleSubmit, formState:{ errors }} = useForm();
    // const [alerta, setAlerta] = useState(false);

    // Objeto en donde se guarda la configuracion general de los campos requeridos
    const objRequired = {
        required: {
            value: true,
            message: 'Este campo es obligatorio'
        },
        minLength: {
            value: 2,
            message: 'Debe tener mas de 2 caracteres'
        }
    }

    // Funcion submit para validar y enviar los datos al backend
    const onSubmit = async data => {
        if (profileObj && profileObj.setLoading) {
            profileObj.setLoading(true);
        }
    
        let infoObj;
        try {
            if (user && user.id) {
                let res = await clienteAxios.post("/users/change-password", {
                    id:user.id,
                    password: data.password,
                    currentPass: data.currentPassword
                });
                // Informacion del proceos realizado
                infoObj = { error: res.data.error, message: res.data.message }
            }else{
                // Informacion del proceso realizado
                infoObj = {
                    error: true,
                    message: "Hubo un error al actualizar la contraseña, vuelva a intentarlo.",
                }
            }
        } catch (error) {
            // Informacion del error
            infoObj = { error: true, message: error.message }
        }

        if (profileObj) {
            profileObj.setLoading(false);
            profileObj.setAlerta({
                error:infoObj.error, 
                message:infoObj.message
            });
            if (!infoObj.error) {
                profileObj.setEditMode(false);
                profileObj.setChangePass(false);
            }

            setTimeout(() => profileObj.setAlerta(false), 5000);
            
        }
    }

    // Retorno del componente
    return (
        <>
            <div className="flex flex-col lg:flex-row my-5">
                <form onSubmit={handleSubmit( data => onSubmit(data))} className='mx-auto w-full md:w-1/2'>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Contraseña Actual */}
                        <div className="flex flex-col col-span-full">
                            <label htmlFor="currentPassword" className="font-bold text-lg">Contraseña Actual</label>
                            <input 
                                id="currentPassword"
                                type="password"
                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                { ...register('currentPassword', {
                                    required: objRequired.required,
                                    minLength:{
                                        value: 6,
                                        message:"La contraseña debe tener más de 6 caracteres"
                                    }
                                }) }/>
                                {
                                    errors.currentPassword?.message && <span className="text-red-600">{errors.currentPassword.message}</span>
                                }
                        </div>
                        {/* Nueva Contraseña */}
                        <div className="flex flex-col col-span-full">
                            <label htmlFor="password" className="font-bold text-lg">Nueva Contraseña</label>
                            <input 
                                id="password"
                                type="password"
                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                { ...register('password', {
                                    required: objRequired.required,
                                    minLength:{
                                        value: 6,
                                        message:"La contraseña debe tener más de 6 caracteres"
                                    }
                                }) }/>
                                {
                                    errors.password?.message && <span className="text-red-600">{errors.password.message}</span>
                                }
                        </div>
                        {/* Repetir Nueva Contraseña */}
                        <div className="flex flex-col col-span-full">
                            <label htmlFor="repeatPassword" className="font-bold text-lg">Nueva Contraseña</label>
                            <input 
                                id="repeatPassword"
                                type="password"
                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                { ...register('repeatPassword', {
                                    required: objRequired.required,
                                    minLength:{
                                        value: 6,
                                        message:"La contraseña debe tener más de 6 caracteres"
                                    }
                                }) }/>
                                {
                                    errors.repeatPassword?.message && <span className="text-red-600">{errors.repeatPassword.message}</span>
                                }
                        </div>
                        <button 
                            type="submit"
                            className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                        >Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;