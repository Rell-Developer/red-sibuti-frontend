import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
// Layout
const ControlLayout = () => {
    // States
    const [user, setUser] = useState({});
    // al renderizar el layout
    useEffect(()=>{
        let userJSON = sessionStorage.getItem('user');
        setUser(JSON.parse(userJSON));
    }, [])
    // Retorno del componente
    return (
        <section className="flex w-full h-full">
            <div className="w-1/5">
                <nav className="flex flex-col mx-auto w-5/6 my-5">
                    {
                        user.rol === "admin" && (
                            <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control">
                                <p className="font-bold text-white mx-2 uppercase">Estadisticas</p>
                            </Link>
                        )
                    }

                    <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/empleos">
                        {/* <BriefCaseSVG fill={"#fff"}/> */}
                        <p className="font-bold text-white mx-2">EMPLEOS</p>
                    </Link>
                    {/* Apartado solo para administradores */}
                    {
                        user.rol === "admin" && (
                            <>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/usuarios">
                                    <p className="font-bold text-white mx-2 uppercase">Usuarios</p>
                                </Link>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/postulaciones">
                                    <p className="font-bold text-white mx-2 uppercase">Postulaciones</p>
                                </Link>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/cargos">
                                    <p className="font-bold text-white mx-2 uppercase">Cargos</p>
                                </Link>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/servicios">
                                    <p className="font-bold text-white mx-2 uppercase">Servicios</p>
                                </Link>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/oferta-servicios">
                                    <p className="font-bold text-white mx-2 uppercase">Oferta de Servicios</p>
                                </Link>
                                <Link className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" to="/inicio/control/calificaciones">
                                    <p className="font-bold text-white mx-2 uppercase">Calificaciones</p>
                                </Link>
                            </>
                        )
                    }
                </nav>
            </div>
            <div className="w-4/5 flex flex-col items-center">
                <Outlet/>
            </div>
        </section>
    )
}
// Exportar el layout
export default ControlLayout