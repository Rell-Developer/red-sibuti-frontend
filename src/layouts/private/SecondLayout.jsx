// Importaciones
import { useEffect, useState } from "react";
// import EmploymentCard from "../../components/private/EmploymentCard.jsx";
import clienteAxios, { configAuth } from "../../config/axios.jsx";
import dateTransform from "../../hooks/dateTransform.js";
import { Link, useNavigate, Outlet } from "react-router-dom";

import AgreementsList from "../../components/private/lists/AgreementsList.jsx";
// Layout para la seccion de empleos y servicios
const SecondLayout = ({chatList, setChatList, onAgreements}) => {

    // const [employments, setEmployments] = useState([]);
    const [employmentsMoreVacancies, setEmploymentsMoreVacancies] = useState([]);
    const [user, setUser] = useState({});
    const [conversationList, setConversationList] = useState([]);
    const [imgProfile, setImgProfile] = useState("/public/img/generic-user.png");
    const navigate = useNavigate();

    useEffect(() => {
        // Buscamos el usuario por la sesion
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        // Si no existe, lo enviamos al login
        if (!userSession) {
            return navigate("/");
        }
        // Establecemos en el user
        setUser(JSON.parse(sessionStorage.getItem("user")));
        // Verificamos si tiene imagen de perfil
        if (userSession.imgProfile) {
            setImgProfile(`${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${userSession.imgProfile}`);
        }
        // console.log(JSON.parse(sessionStorage.getItem("user")));
        const searchEmployments = async () =>{
            // if (!employments || employments.length == 0) {
            //     let {data} = await clienteAxios("/get-open-employments");
            //     // console.log(data);
            //     setEmployments(data.data);
            // }

            if (!employmentsMoreVacancies || employmentsMoreVacancies.length == 0) {
                let { data } = await clienteAxios("/get-employments-most-vacancies");
                setEmploymentsMoreVacancies(data.data);
            }
        }
        // Funcion para buscar las conversaciones
        const searchConversations = async () => {
            try {
                // console.log("Vamos a buscar las conversaciones");
                // console.log(user);
                let userData = JSON.parse(sessionStorage.getItem("user"))
                // const config = configAuth();
                const { data } = await clienteAxios(`/get-conversations/${userData.id}`);
                setConversationList(data.data)
            } catch (error) {
                console.error(error.message);
            }
        }

        const main = async () => {
            await searchEmployments();
            searchConversations();
        }

        main();
    }, [])
    
    const openConversation = async(otherUser) => {
        let userJSON = JSON.parse(sessionStorage.getItem("user"));
        const config = configAuth();
        // Buscamos la conversacion
        let { data } = await clienteAxios.post("/get-conversation", {
            usuarioId: userJSON.id,
            toUser: otherUser.id,
        }, config);

        // console.log(data);

        // Verificamos si hay chats abiertos
        if (chatList.length > 0) {
            // Verificamos que no este en la lista de chat
            if (!chatList.some( chat => chat.otherUser.id === otherUser.id)) {
                // Agregamos la conversacion
                setChatList( chat => [
                    ...chat, 
                    { 
                        id: Date.now(),
                        user: {
                            ...otherUser,
                            fullName: otherUser.name,
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
                        ...otherUser,
                        fullName: otherUser.name,
                    },
                    conversacioneId: data.conversacioneId ? data.conversacioneId : 0,
                }
            ]);
        }
    }

    return (
        <div className="w-full grid grid-cols-4 gap-4 mx-auto">
            {/* Vista Previa del Usuario */}
            <div className="w-full" style={{height: "91vh"}}>
                <div className="bg-white rounded-lg border-2 border-color3 w-5/6 mx-auto mt-5 p-4 shadow-lg">
                    <div className="mx-auto w-5/6">
                        <div className="mx-auto">
                            <img src={imgProfile} alt="imagen-perfil" className="rounded-full w-36 h-36 border-color4 border-4 mx-auto"/>
                        </div>
                        <div className="mx-auto bg-color4 p-5 rounded-lg shadow-lg" style={{marginTop: "-70px"}}>
                            <div className="text-center" style={{marginTop:"60px"}}>
                                <div className="text-white">
                                    <p className="uppercase font-bold text-lg">NOMBRE COMPLETO</p>
                                    <p className="mt-2 text-sm">{user.fullName || user.name}</p>
                                </div>
                                <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">EDAD</p>
                                    <p className="mt-2 text-sm">{ `${ new Date().getFullYear() - new Date(user.dateBirth).getFullYear()} años`}</p>
                                </div>
                                {/* <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">OCUPACION</p>
                                    <p className="mt-2 text-sm">Programador</p>
                                </div>
                                <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">Contacto</p>
                                    <p className="mt-2 text-sm">RED-SIBUTI - CHAT</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
            <div className="w-full" style={{height: "91vh"}}>
            {
                !onAgreements ? (
                    // {/* Ranking y Chat */}
                    <div className="m-5">
                        <div className="">
                            <div className="rounded shadow-lg bg-white py-5 my-5">
                                <div>
                                    <h3 className="uppercase text-color5 font-bold text-xl text-center">empleos con más vacantes</h3>
                                </div>
                                <div className="flex flex-col overflow-scroll h-1/4">
                                    {
                                        employmentsMoreVacancies.map((employment,index) => (
                                            <Link 
                                                className=" flex flex-col w-5/6 mx-auto rounded-lg px-5 py-1 my-2 hover:shadow transition-all hover:border"
                                                to={`/inicio/ver-empleo/${employment.id}`}
                                            >
                                                <h4 className="text-lg font-bold">{employment.usuario.firstName}</h4>
                                                <p className="text-sm">{employment.description}</p>
                                                <em className="font-bold text-sm">{dateTransform(employment.createdAt)}</em>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="rounded shadow-lg bg-white py-5 my-5">
                                <div>
                                    <h3 className="uppercase text-color5 font-bold text-xl text-center">conversaciones</h3>
                                </div>
                                <div className="flex flex-col overflow-scroll h-1/4">
                                    {
                                        conversationList && conversationList.length > 0 ? (
                                            <>
                                                {
                                                    conversationList.map((conversation,index) => (
                                                        <div 
                                                            className="grid grid-cols-12 gap-4 w-5/6 items-center mx-auto rounded-lg px-5 p-2 my-2 hover:shadow transition-all hover:border cursor-pointer"
                                                            onClick={() => openConversation(conversation.otherUser)}
                                                        >
                                                            <img 
                                                                src={
                                                                    conversation.otherUser.imgProfile !== "" ? 
                                                                        `${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${conversation.otherUser.imgProfile}`:"/public/img/generic-user.png"} 
                                                                alt="profile-img" 
                                                                width={50}
                                                                className="rounded-full col-span-3"
                                                            />
                                                            <h4 className="text-lg font-bold col-span-9">{conversation.otherUser.name}</h4>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        ):(
                                            <>
                                                <h4 className="mx-auto my-5">
                                                    Aun no tiene conversaciones
                                                </h4>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                    // {/* Acuerdos */}
                    <div className="m-5">
                        <div className="rounded shadow-lg bg-white py-5 my-5">
                            <div>
                                <h3 className="uppercase text-color5 font-bold text-xl text-center">tus Acuerdos</h3>
                            </div>
                            <div className="flex flex-col overflow-scroll h-1/4">
                                <AgreementsList user={user}/>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
// Exportacion de layout
export default SecondLayout