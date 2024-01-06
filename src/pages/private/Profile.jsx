// Importaciones
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import clienteAxios from "../../config/axios";
import ChatListComponent from "../../components/private/chat/ChatListComponent.jsx";

import ChangePassword from "../../components/private/forms/ChangePassword.jsx";
import Spinner from "../../components/public/Spinner.jsx";
import Alert from "../../components/public/Alert.jsx"
import VerifiedSVG from "../../components/public/svg/VerifiedSVG.jsx";

import EmploymentCard from "../../components/private/EmploymentCard.jsx";
import ServicesList from "../../components/private/lists/ServicesList.jsx";

// Pagina
const Profile = ({setChatList, chatList}) => {
    
    const params = useParams();
    const [user, setUser] = useState({});
    const { register, handleSubmit, formState:{ errors }} = useForm({
        defaultValues: () => searchProfile()
    });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [employments, setEmployments] = useState([]);

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

    // useEffect(()=>{
    //     setValue("dateBirth", user.dateBirth)
    // },[user]);

    const searchProfile = async() => {
        try {
            let userJSON = JSON.parse(sessionStorage.getItem("user"));
            let {data} = await clienteAxios(`/users/${params.id}`);
            delete data.data.password
            setUser(data.data);

            // if (userJSON.id === data.data.id) {
                
            //     // data.data.nacionalityId = data.data.nacionality.name
            //     data.data.dateBirth = new Date(data.data.dateBirth);

            //     setLoading(false);
            //     searchHires();
            //     return data.data
            // }
            data.data.dateBirth = new Date(data.data.dateBirth);
            searchHires();
            setLoading(false);
            return data.data
        } catch (error) {
            console.log(error.message);
        }
    }

    const onHandleSubmit = async data =>{
        // console.log(data);
        try {
            setLoading(true);
            let res = await clienteAxios.put(`/users/${params.id}`, data);
            setTimeout(() => {
                if (res.data.error) {
                    setAlerta({ message: res.data.message, error: true});
                    return setTimeout(() => setAlerta(false), 5000);
                }
                // Se notifica el resultado del backend
                setAlerta({message: res.data.message, error:false});
                // Se quita el spinner
                setLoading(false);
                // en 5 segundos se quita el alerta
                setTimeout(() => setAlerta(false), 5000);
                // Actualizacion
                setUser(res.data)
                // Se cachea la data del usuario actualizada
                sessionStorage.setItem("user", JSON.stringify(res.data.data));
            }, 3000);
        } catch (error) {
            console.log(error.message);
        }
    }

    const openChat = async() => {

        let userJSON = JSON.parse(sessionStorage.getItem("user"));

        // Buscamos la conversacion
        let { data } = await clienteAxios.post("/get-conversation", {
            usuarioId: userJSON.id,
            toUser: user.id,
        });

        console.log(data);

        // Verificamos si hay chats abiertos
        if (chatList.length > 0) {
            // Verificamos que no este en la lista de chat
            if (!chatList.some( chat => chat.user.id === user.id)) {
                // Agregamos la conversacion
                setChatList( chat => [
                    ...chat, 
                    { 
                        id: Date.now(),
                        user: {
                            ...user,
                            fullName: `${user.firstName} ${user.lastName}`
                        },
                        conversacioneId: data.conversacioneId ? data.conversacioneId : 0,
                    }
                ]);
            }
        }else{
            // Agregamos la conversacion
            setChatList( chat => [
                ...chat, 
                { 
                    id: Date.now(),
                    user: {
                        ...user,
                        fullName: `${user.firstName} ${user.lastName}`,
                    },
                    conversacioneId: data.conversacioneId ? data.conversacioneId : 0,
                }
            ]);
        }
    }

    // Buscamos las contrataciones del usuario
    const searchHires = async () =>{
        try {
            let { data: { data } } = await clienteAxios(`/users/get-hires/${params.id}`);
            



            let employs = data.map( res => res['postulacione'] ? res['postulacione']['employment']: false);
            //     if (res['postulacione']) {
                    
            //         return res['postulacione']['employment']
            //     }
            // });
            employs = employs.filter( employ => employ !== false);
            console.log(employs);
            setEmployments(employs);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="w-full h-screen">
                <div className="w-3/4 bg-white rounded shadow-lg mx-auto my-5 flex flex-col p-5">
                    {alerta && <Alert alerta={alerta}/>}
                    {
                        loading ?  (
                            <>
                                <Spinner/>
                            </>
                        ):(
                            <>
                                { !changePass ? (
                                        <form action="" onSubmit={handleSubmit(data => onHandleSubmit(data))}>
                                            <div className="flex flex-col lg:flex-row my-5">
                                                <div className="w-1/5">
                                                    <img src="/public/img/generic-user.png" alt="imagen-perfil" className={`${user.authToken === "" || !user.authToken ? "":"border-color4"} rounded-full w-36 h-36 border-4 mx-auto`}/>
                                                    {/* TODO: Colocar funcion para subir imagen de perfil */}
                                                    {/* {
                                                        editMode && (
                                                            <>
                                                                <input id="imgProfile" type="file" accept="image/*" className="hidden" {...register('imgProfile')}/>
                                                                <a href="#imgProfile">Subir una Imagen de Perfil</a>
                                                            </>
                                                        )
                                                    } */}
                                                </div>
                                                <div className="flex m-4">
                                                    <div>
                                                        {
                                                            !editMode ? (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <h3 className="text-4xl font-bold uppercase">{user.firstName} {user.secondName} {user.lastName} {user.secondLastName}</h3>
                                                                        {
                                                                            user.verifiedToken && !editMode && (
                                                                                <>
                                                                                    {
                                                                                        user.verifiedAccount ? (
                                                                                            <VerifiedSVG color={"#38A3A5"} size={"40px"}/>
                                                                                        ):(
                                                                                            <VerifiedSVG color={"#aaaaaa"} size={"40px"}/>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <p><span className="font-bold">Correo Electronico:</span> {user.email}</p>
                                                                        <p><span className="font-bold">Identificación:</span> {user?.nacionality?.name}-{user?.identification}</p>
                                                                        <p><span className="font-bold">Fecha de Nacimiento:</span> {new Date(user.dateBirth).getDate()}-{new Date(user.dateBirth).getMonth()}-{new Date(user.dateBirth).getFullYear()}</p>
                                                                    </div>
                                                                </>
                                                            ):(
                                                                <>
                                                                    <div className="grid grid-cols-12 gap-4">
                                                                        {/* Primer Nombre */}
                                                                        <div className="flex flex-col col-span-3">
                                                                            <label htmlFor="firstName" className="font-bold text-lg">Primer Nombre</label>
                                                                            <input 
                                                                                id="firstName"
                                                                                type="text"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('firstName', objRequired) }/>
                                                                                {
                                                                                    errors.firstName?.message && <span className="text-red-600">{errors.firstName.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* Segundo Nombre */}
                                                                        <div className="flex flex-col col-span-3">
                                                                            <label htmlFor="secondName" className="font-bold text-lg">Segundo Nombre</label>
                                                                            <input 
                                                                                id="secondName"
                                                                                type="text"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('secondName', objRequired) }/>
                                                                                {
                                                                                    errors.secondName?.message && <span className="text-red-600">{errors.secondName.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* Primer Apellido */}
                                                                        <div className="flex flex-col col-span-3">
                                                                            <label htmlFor="lastName" className="font-bold text-lg">Primer Apellido</label>
                                                                            <input 
                                                                                id="lastName"
                                                                                type="text"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('lastName', objRequired) }/>
                                                                                {
                                                                                    errors.lastName?.message && <span className="text-red-600">{errors.lastName.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* Segundo Apellido */}
                                                                        <div className="flex flex-col col-span-3">
                                                                            <label htmlFor="secondLastName" className="font-bold text-lg">Segundo Apellido</label>
                                                                            <input 
                                                                                id="secondLastName"
                                                                                type="text"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('secondLastName', objRequired) }/>
                                                                                {
                                                                                    errors.secondLastName?.message && <span className="text-red-600">{errors.secondLastName.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* Correo */}
                                                                        <div className="flex flex-col col-span-4">
                                                                            <label htmlFor="email" className="font-bold text-lg">Correo Electronico</label>
                                                                            <input 
                                                                                id="email"
                                                                                type="email"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('email', {
                                                                                    required: objRequired.required,
                                                                                    pattern: {
                                                                                        value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                                                                                        message:"Correo no valido"
                                                                                    }
                                                                                }) }/>
                                                                                {
                                                                                    errors.email?.message && <span className="text-red-600">{errors.email.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* Fecha de Nacimiento */}
                                                                        <div className="flex flex-col col-span-4">
                                                                            <label htmlFor="dateBirth" className="font-bold text-lg">Fecha de Nacimiento</label>
                                                                            <input 
                                                                                id="dateBirth"
                                                                                name="dateBirth"
                                                                                type="date"
                                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                { ...register('dateBirth', {
                                                                                    required: objRequired.required,
                                                                                }) }/>
                                                                                {
                                                                                    errors.dateBirth?.message && <span className="text-red-600">{errors.dateBirth.message}</span>
                                                                                }
                                                                        </div>

                                                                        {/* identificacion */}
                                                                        <div className="flex flex-col col-span-4">
                                                                            <label htmlFor="identification" className="font-bold text-lg">Identificacion</label>
                                                                            <div className="flex">
                                                                                <select name="nacionalityId" id="nacionalityId" className="rounded-xl p-2 border-2 bg-white border-black mt-2 shadow-md"
                                                                                    { ...register('nacionalityId')}
                                                                                >
                                                                                    <option value="V">V-</option>
                                                                                    <option value="E">E-</option>
                                                                                </select>
                                                                                <input 
                                                                                    id="identification"
                                                                                    type="text"
                                                                                    className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                                                    { ...register('identification', {
                                                                                        required: objRequired.required,
                                                                                        minLength: {
                                                                                            value: 6,
                                                                                            message: 'Identificacion no Valida'
                                                                                        },
                                                                                        // TODO: Colocar validacion que solo acepte numeros del 0 al 9
                                                                                    }) }/>
                                                                            </div>
                                                                            {
                                                                                errors.identification?.message && <span className="text-red-600">{errors.identification.message}</span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                editMode && <button type="submit" className="bg-color4 hover:bg-color3 text-white font-bold p-3 mx-2 rounded-lg shadow-lg transition-all uppercase">Guardar Cambios</button>
                                            }
                                        </form>
                                    ):(
                                        <ChangePassword user={user} profileObj={{setAlerta, setEditMode, setChangePass, setLoading}}/>
                                    )
                                }
                                
                                {/* Botones */}
                                <div className="my-5 flex flex-col lg:flex-row">
                                    {
                                        user.id !== JSON.parse(sessionStorage.getItem("user")).id ? (
                                            <>
                                                <button className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2" onClick={() => openChat()}>Chatear</button>
                                            </>
                                        ):(
                                            <>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <button 
                                                                type="button" 
                                                                className="bg-color6 hover:bg-gray-600 text-white font-bold p-3 mx-2 rounded-lg shadow-lg transition-all uppercase" 
                                                                onClick={() => setEditMode(false)}
                                                            >
                                                                Descartar
                                                            </button>
                                                        </>
                                                    ):(
                                                        <>
                                                            {
                                                                !changePass ? (
                                                                    <>
                                                                        <button 
                                                                            className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2" 
                                                                            onClick={()=> setEditMode(true)}
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                        <button className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2" onClick={() => setChangePass(true)}>Cambiar Contraseña</button>
                                                                    </>
                                                                ):(
                                                                    <>
                                                                        {/* <button 
                                                                            type="submit"
                                                                            className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2" 
                                                                            onClick={}
                                                                        >
                                                                            Guardar Cambios
                                                                        </button> */}
                                                                        <button 
                                                                            className="bg-color6 hover:bg-gray-600 text-white font-bold p-3 mx-2 rounded-lg shadow-lg transition-all uppercase" 
                                                                            onClick={() => {
                                                                                setChangePass(false);
                                                                                setEditMode(false);
                                                                            }}
                                                                        >
                                                                            Descartar
                                                                        </button>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>

                                <hr />

                                {/* Servicios */}
                                {
                                    user.verifiedToken && user.verifiedAccount && (
                                        <ServicesList user={user}/>
                                    )
                                }

                                <hr />

                                {/* Empleos conseguidos */}
                                <div className="grid grid-cols-6">
                                    <div className="m-5 col-span-6">
                                        <h3 className="text-lg uppercase text-color5 font-bold">Empleos Conseguidos en RED-SIBUTI</h3>
                                        <div>
                                            {
                                                employments.map((employment,index) => <EmploymentCard
                                                    key={index}
                                                    company={{
                                                        id: employment.id,
                                                        name:employment.usuario.firstName,
                                                        verifiedToken:employment.usuario.verifiedToken,
                                                        verifiedAccount:employment.usuario.verifiedAccount
                                                    }}   
                                                    employment={{
                                                        id: employment.id,
                                                        description: employment.description,
                                                        create_date: employment.createdAt,
                                                        status:`${employment.status === "open" ? "Abierto":"Cerrado"}`,
                                                        vacancies:employment.vacancies,
                                                        postulations:employment.postulations
                                                    }}
                                                />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
// Se Exporta la pagina
export default Profile