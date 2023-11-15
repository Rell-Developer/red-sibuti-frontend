// Importaciones
import CellGroup from "../../components/private/CellGroup.jsx";
import HeaderNav from "../../components/private/HeaderNav.jsx";
import clienteAxios from "../../config/axios.jsx";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ChatComponent from "../../components/private/chat/ChatComponent.jsx";
// Layouts
import SecondLayout from "./SecondLayout.jsx";

import BriefCaseSVG from "../../components/public/svg/BriefCaseSVG.jsx";

// Componente Layout
const MainLayout = ({section}) => {

    // UseState
    const [users, setUsers] = useState([]);
    const [optionSelected, setOptionSelected] = useState('empleos');
    return (
        <>
            <main className="flex flex-col">
                {/* Cabecera */}
                <HeaderNav height={"9vh"}  props={{optionSelected, setOptionSelected}}/>
                <section className="w-full flex flex-col h-100 items-center bg-color1" style={{height:"91vh"}}>
                    <Outlet/>
                    {/* <ChatComponent/> */}
                </section>
            </main>
        </>
    )
}
// Se exporta el layout
export default MainLayout