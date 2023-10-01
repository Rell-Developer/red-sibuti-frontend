// Importaciones
import dateTransform from "../../../hooks/dateTransform.js";
import { useNavigate } from "react-router-dom";
// Componente
const PostulationListCard = ({postulation}) => {
    let navigate = useNavigate();
    return (
        <>
            <div 
                className="col-span-3 grid grid-cols-3 bg-white p-3 rounded shadow hover:cursor-pointer transition-all hover:bg-slate-100"
                onClick={()=> navigate(`/inicio/usuario/${postulation.usuario.id}`)}
            >
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
export default PostulationListCard