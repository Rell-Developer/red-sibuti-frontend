// Importaciones
import { useState, useEffect } from "react";
import clienteAxios from "../../../config/axios.jsx";
import dateTransform from "../../../hooks/dateTransform.js";
import { useNavigate } from "react-router-dom";

const PositionsList = () => {
    // useStates
    const [positions, setPositions] = useState([]);
    // useEffect
    useEffect(() => {
        const searchPositions = async () => {
            try {
                let { data } = await clienteAxios("/get-positions");
                // console.log(data);
                setPositions(data.data)
            } catch (error) {
                console.error(error.message);
            }
        };

        searchPositions();
    }, [])
    // 
    const navigate = useNavigate();

    // Retorno
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full flex text-center uppercase font-bold my-4 justify-center">
                    <h2 className="text-3xl flex self-center">Cargos</h2>

                    <button 
                        className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full text-md flex self-end"
                        onClick={(e) => navigate("/inicio/control/cargos/nuevo")}
                        >Crear Cargo</button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="col-span-4 grid grid-cols-4 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-2">
                            <p>Nombre</p>
                        </div>
                        {/* <div className="col-span-1">
                            <p>Correo Electronico</p>
                        </div> */}
                        <div className="col-span-2">
                            <p>Fecha de Creación</p>
                        </div>
                        {/* <div className="col-span-1">
                            <p>Accion</p>
                        </div> */}
                    </div>
                    {positions.map( (position,index) => (
                        <>
                            <div className="col-span-4 grid grid-cols-4 gap-4 bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition-all" onClick={() => navigate(`/inicio/control/cargos/${position.id}`)}>
                                <p className="col-span-2">{position.name}</p>
                                <p className="col-span-2">{dateTransform(position.createdAt)}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PositionsList;