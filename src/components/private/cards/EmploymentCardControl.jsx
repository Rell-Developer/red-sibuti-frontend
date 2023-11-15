import { Link } from "react-router-dom";
import dateTransform from "../../../hooks/dateTransform.js";
// Componente
const EmploymentCardControl = ({employment}) => {
    return (
        <>
            <div className="col-span-full md:col-span-6 lg:col-span-3 bg-white rounded shadow-lg p-5">
                <div>
                    <p className="font-bold">Cargo: <span className="font-light">{employment.cargo}</span></p>
                    <p className="font-bold">Estatus: <span className="font-light">{employment.status === "open" ? "Abierto":"Cerrado"}</span></p>
                    <p className="font-bold">Vacantes: <span className="font-light">{employment.vacancies}</span></p>
                    <p className="font-bold">Fecha de Creacion: <span className="font-light">{dateTransform(employment.createdAt)}</span></p>
                </div>
                <div className="flex flex-col my-2">
                    <Link 
                        className="uppercase bg-color4 hover:bg-color3 transition-all p-2 my-1 rounded cursor-pointer font-bold text-white text-center"
                        to={`/inicio/control/empleos/${employment.id}`}
                    >Ver DETALLES</Link>
                    {/* <button className="uppercase bg-red-600 hover:bg-red-500 transition-all p-1 my-1 rounded cursor-pointer font-bold text-white">cerrar empleo</button> */}
                </div>
            </div>
        </>
    )
}
// Se extrae el componente
export default EmploymentCardControl;