import { Link } from "react-router-dom"
// Pagina
const Employments = () => {
    return (
        <>
            <div className="w-5/6 my-10">
                <div className="text-center">
                    <h2 className="font-bold text-3xl text-color5">ADMINISTRA TUS EMPLEOS</h2>
                </div>

                <div>
                    <Link to="/inicio/empleos/nuevo">
                        <button className="bg-color4 rounded shadow-lg p-2 font-bold text-white">AGREGAR NUEVO EMPLEO</button>
                    </Link>
                </div>

                <div className="grid grid-cols-12 gap-4 my-5">
                    <div className="col-span-3 bg-white rounded shadow-lg p-5">
                        <div>
                            <p className="font-bold">Cargo: <span className="font-light">Secretaria</span></p>
                            <p className="font-bold">Estatus: <span className="font-light">Abierta</span></p>
                            <p className="font-bold">Vacantes: <span className="font-light">2</span></p>
                            <p className="font-bold">Fecha de Creacion: <span className="font-light">01/09/2023</span></p>
                        </div>
                        <div className="flex flex-col my-2">
                            <button className="uppercase bg-color4 hover:bg-color3 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">Ver DETALLES</button>
                            <button className="uppercase bg-red-600 hover:bg-red-500 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">cerrar empleo</button>
                        </div>
                    </div>
                    
                    <div className="col-span-3 bg-white rounded shadow-lg p-5">
                        <div>
                            <p className="font-bold">Cargo: <span className="font-light">Secretaria</span></p>
                            <p className="font-bold">Estatus: <span className="font-light">Abierta</span></p>
                            <p className="font-bold">Vacantes: <span className="font-light">2</span></p>
                            <p className="font-bold">Fecha de Creacion: <span className="font-light">01/09/2023</span></p>
                        </div>
                        <div className="flex flex-col my-2">
                            <button className="uppercase bg-color4 hover:bg-color3 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">Ver DETALLES</button>
                            <button className="uppercase bg-red-600 hover:bg-red-500 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">cerrar empleo</button>
                        </div>
                    </div>

                    <div className="col-span-3 bg-white rounded shadow-lg p-5">
                        <div>
                            <p className="font-bold">Cargo: <span className="font-light">Secretaria</span></p>
                            <p className="font-bold">Estatus: <span className="font-light">Abierta</span></p>
                            <p className="font-bold">Vacantes: <span className="font-light">2</span></p>
                            <p className="font-bold">Fecha de Creacion: <span className="font-light">01/09/2023</span></p>
                        </div>
                        <div className="flex flex-col my-2">
                            <button className="uppercase bg-color4 hover:bg-color3 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">Ver DETALLES</button>
                            <button className="uppercase bg-red-600 hover:bg-red-500 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">cerrar empleo</button>
                        </div>
                    </div>

                    <div className="col-span-3 bg-white rounded shadow-lg p-5">
                        <div>
                            <p className="font-bold">Cargo: <span className="font-light">Secretaria</span></p>
                            <p className="font-bold">Estatus: <span className="font-light">Abierta</span></p>
                            <p className="font-bold">Vacantes: <span className="font-light">2</span></p>
                            <p className="font-bold">Fecha de Creacion: <span className="font-light">01/09/2023</span></p>
                        </div>
                        <div className="flex flex-col my-2">
                            <button className="uppercase bg-color4 hover:bg-color3 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">Ver DETALLES</button>
                            <button className="uppercase bg-red-600 hover:bg-red-500 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">cerrar empleo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// Exportar Pagina
export default Employments