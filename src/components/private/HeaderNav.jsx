// Importaciones
import OptionHeader from "./OptionHeader.jsx";
import ConfigSVG from "../public/svg/ConfigSVG.jsx"
import BriefCaseSVG from "../public/svg/BriefCaseSVG.jsx";
import ServiceSVG from "../public/svg/ServiceSVG.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import clienteAxios from "../../config/axios.jsx";

import { FaHandshake } from "react-icons/fa";

// Componente del navegador
const HeaderNav = ({height, setOnAgreements, onAgreements}) => {

    const [user, setUser] = useState({});
    const [options, setOptions] = useState([
        { id: 1, svg: BriefCaseSVG, title: "Empleos", selected: true, link:"/inicio"},
        { id: 2, svg: ServiceSVG, title: "Servicios", selected: true, link:"/inicio/servicios"},
        { id: 3, svg: ConfigSVG, title: "Control", selected: false, link: "/inicio/control/empleos" }
    ]);

    const navigate = useNavigate();
    useEffect(()=>{
        let userJSON = JSON.parse(sessionStorage.getItem("user"));
        
        setUser(userJSON);
        // console.log(user);
        if (user.rol === "company") {

            // let controlOption = { id: 2, svg: ConfigSVG, title: "Control", selected: false, link: "/inicio/control/empleos" }
            // if (options.includes( option => option.title === controlOption.title)){
            //     setOptions((state) => [...state, controlOption]);
            // }
            // console.log(options);
            // if (!options.includes(controlOption)) {
            // }
            
            alert('se agrega la opcion de control')
            // options.push({ id: 2, svg: ConfigSVG, title: "Control", selected: false, link: "/inicio/control/empleos" })
        }
    }, [])
    // useEffect(() => {
    //     changeSection(false);
    // },[])

    const changeSection = (node) =>{

        // if (node) {
        //     options.forEach( option =>{
        //         console.log(node);
        //         if (option.id === node.id) {
        //             option.selected = true;
        //         }else{
        //             option.selected = false;
        //         }
        //     })
        // }else{
        //     let path = window.location.pathname;
        //     console.log(path);
        //     options.forEach(option => {
        //         if (option.link === path) {
        //             option.selected = true
        //         }else{
        //             option.selected = false
        //         }
        //     })
        // }

    }

    const logOut = async() => {
        try {
            let { data } = await clienteAxios.post("/log-out",{authToken: user.authToken});
            sessionStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <header className="w-full mx-auto bg-color4 shadow-lg absolute" style={{height}}>
                <nav className="mx-10 my-3 flex justify-between text-white items-center">
                    <h2 className="font-bold text-2xl cursor-pointer" onClick={() => navigate("/inicio")}>RED-SIBUTI</h2>
                    <div className="flex justify-between">
                        {/* Option de Empleos */}
                        <OptionHeader option={options[0]} changeSection={changeSection}/>
                        <OptionHeader option={options[1]} changeSection={changeSection}/>
                        {/* Si el usuario es admin o empresa */}
                        {
                            user.rol !== "common" && (
                                <>
                                    {/* Opcion de Control  */}
                                    <OptionHeader option={options[2]} changeSection={changeSection}/>
                                </>
                            )
                        }
                            {/* {
                                options.map((option) => <OptionHeader option={option} changeSection={changeSection}/>)
                            } */}
                        {/* <div className="flex flex-col justify-center items-center uppercase font-bold bg-white rounded-lg p-2 shadow-lg mx-2">
                            
                            <BriefCaseSVG fill={"#38A3A5"}/>
                            <p className="text-sm text-color4">Empleos</p>  
                        </div>
                        <div className="flex flex-col justify-center items-center uppercase font-bold rounded-lg p-2 mx-2">
                            <img src="/svg/config.svg" alt="users-svg" width={"30"}/>
                            <ConfigSVG fill={"#fff"}/>
                            <p className="text-sm text-white">Control</p>  
                        </div> */}
                    </div>
                    <div className="flex items-center justify-around w-52">
                        {/* <Link
                            to={`/inicio/usuario/${user.id}`}
                        >
                            <img className="cursor-pointer" src="/public/svg/users.svg" alt="user-profile" width={30} height={30}/>
                        </Link> */}
                        <FaHandshake
                            size={ onAgreements ? 40: 30}
                            onClick={()=> setOnAgreements(!onAgreements)}
                            className={`cursor-pointer ${onAgreements && 'rounded-full bg-white p-2'}`}
                            color={`${onAgreements ? '#38A3A5':'#fff'}`}
                        />
                        {/* <img className={`cursor-pointer`} src="/public/svg/handshake.svg" alt="agreements-icon" width={30} height={30} onClick={()=> setOnAgreements(!onAgreements)}/> */}
                        <img className="cursor-pointer" onClick={() => navigate(`/inicio/usuario/${user.id}`)} src="/public/svg/users.svg" alt="user-profile" width={30} height={30}/>
                        <img className="cursor-pointer" onClick={() => logOut()} src="/public/svg/sign-out.svg" alt="sign-out-profile" width={30} height={30}/>
                    </div>
                </nav>
            </header>
            <div style={{height}}></div>
        </>
    )
}
// Se exporta
export default HeaderNav