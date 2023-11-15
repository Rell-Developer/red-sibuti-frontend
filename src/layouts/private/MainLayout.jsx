// Importaciones
// import CellGroup from "../../components/private/CellGroup.jsx";
import HeaderNav from "../../components/private/HeaderNav.jsx";
// import clienteAxios from "../../config/axios.jsx";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ChatComponent from "../../components/private/chat/ChatComponent.jsx";
// Layouts
// import SecondLayout from "./SecondLayout.jsx";

// import BriefCaseSVG from "../../components/public/svg/BriefCaseSVG.jsx";
// Importaciones
import { io } from 'socket.io-client';

const socket = io('http://localhost:3803');
// console.log(process.env.SERVER_BACKEND_URL);

// Componente Layout
const MainLayout = ({section}) => {
    // UseState
    const [users, setUsers] = useState([]);
    const [optionSelected, setOptionSelected] = useState('empleos');
    // Funcion al momento en que
    useEffect(() => {
        // Evento que retorna cuando el socket se conecta correctamente
        socket.on('connect', ()=>{
            console.log('Conectado al socket');
        });
    }, [])
    
    // Retorno al cliente
    return (
        <>
            <main className="flex flex-col">
                {/* Cabecera */}
                <HeaderNav height={"9vh"}  props={{optionSelected, setOptionSelected}}/>
                <section className="w-full flex flex-col h-100 items-center bg-color1" style={{height:"91vh"}}>
                    <Outlet/>
                    <ChatComponent/>
                </section>
            </main>
        </>
    )
}
// Se exporta el layout
export default MainLayout