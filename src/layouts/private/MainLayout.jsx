// Importaciones
// import CellGroup from "../../components/private/CellGroup.jsx";
import HeaderNav from "../../components/private/HeaderNav.jsx";
// import clienteAxios from "../../config/axios.jsx";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ChatComponent from "../../components/private/chat/ChatComponent.jsx";
import ChatListComponent from "../../components/private/chat/ChatListComponent.jsx";
// Layouts
// import SecondLayout from "./SecondLayout.jsx";
// import { io } from 'socket.io-client';
// import clienteAxios from "../../../config/axios.jsx";

// const socket = io('http://localhost:3803');

// import BriefCaseSVG from "../../components/public/svg/BriefCaseSVG.jsx";
// Componente Layout
const MainLayout = ({section, chatList, setChatList, setOnAgreements, onAgreements}) => {
    // UseState
    const [users, setUsers] = useState([]);
    const [optionSelected, setOptionSelected] = useState('empleos');
    
    // Retorno al cliente
    return (
        <>
            <main className="flex flex-col">
                {/* Cabecera */}
                <HeaderNav height={"9vh"}  props={{optionSelected, setOptionSelected}} setOnAgreements={setOnAgreements} onAgreements={onAgreements}/>
                <section className="w-full flex flex-col h-100 items-center bg-color1" style={{height:"91vh"}}>
                    <Outlet/>
                    <ChatListComponent chatList={chatList} setChatList={setChatList} />
                    {/* <ChatComponent/> */}
                </section>
            </main>
        </>
    )
}
// Se exporta el layout
export default MainLayout