// Importaciones
import dateTransform from "../../../hooks/dateTransform.js";
import { useNavigate } from "react-router-dom";
// Componente
const PostulationListCard = ({postulation, admin}) => {
    // Navegador
    let navigate = useNavigate();
    // Funcion para controlar el evento del click en el row
    const handleClick = ({target}) =>{
        // Verificamos que el clic sea en el nombre de la empresa
        if (target.parentElement.id === 'companyName' || target.id === 'companyName') {
            // En caso de que lo sea, paramos la accion
            return
        }
        // Si se dio clic al row, redirigimos a la vista del usuario postulado
        navigate(`/inicio/usuario/${postulation.usuario.id}`);
    }
    return (
        <>
            {/* Si es administrador, colocamos otro columna para el nombre de la empresa */}
            <div 
                className={`${admin ? 'col-span-4 grid-cols-4':'col-span-3 grid-cols-3'} grid bg-white p-3 rounded shadow hover:cursor-pointer transition-all hover:bg-slate-100`}
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
            </div>
        </>
    );
}
// Exportamos el componente
export default PostulationListCard;