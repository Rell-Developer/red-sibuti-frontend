// Importaciones
import dateTransform from "../../../hooks/dateTransform.js";
import { useNavigate } from "react-router-dom";
// Componente
const UserCardList = ({usuario}) => {
    let navigate = useNavigate();
    return (
        <>
            <div 
                className="col-span-3 grid grid-cols-3 bg-white p-3 rounded shadow hover:cursor-pointer transition-all hover:bg-slate-100"
                onClick={()=> navigate(`/inicio/usuario/${usuario.id}`)}
            >
                <div className="col-span-1">
                    <p>
                        {usuario.firstName} {usuario.lastName}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        {usuario.email}
                    </p>
                </div>
                <div className="col-span-1">
                    <p>
                        {dateTransform(usuario.createdAt)}
                    </p>
                </div>
            </div>
        </>
    );
}
// Exportamos el componente
export default UserCardList;