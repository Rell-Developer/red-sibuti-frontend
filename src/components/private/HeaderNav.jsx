// Importaciones
import OptionHeader from "./OptionHeader.jsx";
import ConfigSVG from "../public/svg/ConfigSVG.jsx"
import BriefCaseSVG from "../public/svg/BriefCaseSVG.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios.jsx";

// Componente del navegador
const HeaderNav = ({height}) => {

    const options = [
        { id: 1, svg: BriefCaseSVG, title: "Empleos", selected: true, link:"/inicio"},
        { id: 2, svg: ConfigSVG, title: "Control", selected: false, link: "/inicio/control/empleos" }
    ]

    const navigate = useNavigate();
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
            let user = JSON.parse(sessionStorage.getItem("user"));
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
                    <h2 className="font-bold text-2xl">RED-SIBUTI</h2>
                    <div className="flex justify-between">
                        {
                            options.map((option) => <OptionHeader option={option} changeSection={changeSection}/>)
                        }
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
                    <p className="font-bold cursor-pointer" onClick={() => logOut()}>Salir</p>
                </nav>
            </header>
            <div style={{height}}></div>
        </>
    )
}
// Se exporta
export default HeaderNav