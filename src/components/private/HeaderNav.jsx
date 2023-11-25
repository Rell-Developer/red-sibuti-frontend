// Importaciones
import OptionHeader from "./OptionHeader.jsx";
import ConfigSVG from "../public/svg/ConfigSVG.jsx"
import BriefCaseSVG from "../public/svg/BriefCaseSVG.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import clienteAxios from "../../config/axios.jsx";

// Componente del navegador
const HeaderNav = ({height}) => {

    const [user, setUser] = useState({});
    const [options, setOptions] = useState([
        { id: 1, svg: BriefCaseSVG, title: "Empleos", selected: true, link:"/inicio"},
        { id: 2, svg: ConfigSVG, title: "Control", selected: true, link:"/inicio/control/empleos"},
    ]);

    // const options = [
    //     { id: 1, svg: BriefCaseSVG, title: "Empleos", selected: true, link:"/inicio"},
    //     // { id: 2, svg: ConfigSVG, title: "Control", selected: true, link:"/inicio/control/empleos"},
    // ]

    const navigate = useNavigate();
    useEffect(()=>{
        let userJSON = JSON.parse(sessionStorage.getItem("user"));
        
        setUser(userJSON);
        console.log(user);
        if (user.rol === "company") {

            let controlOption = { id: 2, svg: ConfigSVG, title: "Control", selected: false, link: "/inicio/control/empleos" }
            if (options.includes( option => option.title === controlOption.title)){
                setOptions((state) => [...state, controlOption]);
            }
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
                    <h2 className="font-bold text-2xl">RED-SIBUTI</h2>
                    <div className="flex justify-between">
                        <OptionHeader option={options[0]} changeSection={changeSection}/>
                        <OptionHeader option={options[1]} changeSection={changeSection}/>
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
                    <div className="flex items-center justify-around w-32">
                        {/* <Link
                            to={`/inicio/usuario/${user.id}`}
                        >
                            <img className="cursor-pointer" src="/public/svg/users.svg" alt="user-profile" width={30} height={30}/>
                        </Link> */}
                        <img className="cursor-pointer" onClick={() => navigate(`/inicio/usuario/${user.id}`)} src="/public/svg/users.svg" alt="user-profile" width={30} height={30}/>
                        <p className="font-bold cursor-pointer" onClick={() => logOut()}>Salir</p>
                    </div>
                </nav>
            </header>
            <div style={{height}}></div>
        </>
    )
}
// Se exporta
export default HeaderNav