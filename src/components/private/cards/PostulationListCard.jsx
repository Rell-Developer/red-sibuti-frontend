// Importaciones
import clienteAxios from "../../../config/axios.jsx";
import dateTransform from "../../../hooks/dateTransform.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Componente
const PostulationListCard = ({postulation, admin}) => {
    // Navegador
    let navigate = useNavigate();
    // States
    const [selected, setSelected] = useState(false);
    // Funcion para controlar el evento del click en el row
    const handleClick = ({target}) =>{
        // Verificamos que el clic sea en el nombre de la empresa
        if (target.parentElement.id === 'companyName' || target.id === 'companyName' || target.parentElement.id === 'seleccionBtn' || target.id === 'seleccionBtn' ) {
            // En caso de que lo sea, paramos la accion
            return
        }
        // Si se dio clic al row, redirigimos a la vista del usuario postulado
        navigate(`/inicio/usuario/${postulation.usuario.id}`);
    }

    // Funcion para seleccionar al personal
    const selectPersonal = async(e) => {
        e.preventDefault();

        // Funcion http para realizar la seleccion del personal
        let { data } = await clienteAxios.post("/new-hiring", { postulacioneId: postulation.id});

        console.log(data);
        if (data.error) {
            return alert(data.message);
        }

        // se establece el state
        setSelected(true);
    }
    console.log(postulation);
    return (
        <>
            {/* Si es administrador, colocamos otro columna para el nombre de la empresa */}
            <div 
                className={`col-span-4 grid-cols-4 grid bg-white p-3 rounded shadow hover:cursor-pointer transition-all hover:bg-slate-100`}
                onClick={e => handleClick(e)}
            >
                {/* Si es administrador, habilitamos el campo de nombre de la empresa */}
                {
                    admin && (
                        <>
                            <div id='companyName' className="col-span-1"
                                onClick={()=> navigate(`/inicio/usuario/${postulation.employment.usuario.id}`)}
                            >
                                <p>
                                    {postulation.employment.usuario.firstName}
                                </p>
                            </div>
                        </>
                    )
                }
                <div className="col-span-1">
                    <p>
                        {postulation.usuario.firstName} {postulation.usuario.lastName}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        {postulation.usuario.email}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        {dateTransform(postulation.createdAt)}
                    </p>
                </div>
                {
                    postulation.isHirign ? (
                        <>
                            <div className="flex">
                                <p>Personal Seleccionado </p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#38A3A5" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </>
                    ):(
                        <>
                            {
                                postulation.isOpen && (
                                    <>
                                        {
                                            (!admin && !selected) && (
                                                <>
                                                    <button 
                                                        id="seleccionBtn"
                                                        className="col-span-1"
                                                        onClick={(e)=> selectPersonal(e)}
                                                    >
                                                        <p className="bg-color4 text-white font-bold p-1 rounded-md">
                                                            Seleccionar Personal
                                                        </p>
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    );
}
// Exportamos el componente
export default PostulationListCard;