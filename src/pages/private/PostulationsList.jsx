// Librerias
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// Card
import PostulationListCard from "../../components/private/cards/PostulationListCard.jsx";
// Config
import clienteAxios from "../../config/axios.jsx";
// Pagina
const PostulationsList = () => {
    // States y hooks
    const [postulations, setPostulations] = useState([]);
    const params = useParams();
    // Cada vez que se renderice la pagina
    useEffect(()=>{
        const searchPostulations = async() =>{
            // Buscamos las postulaciones de este empleo en base a su id
            let {data} = await clienteAxios(`/get-employment-postulation/${params.id}`);
            // Asignamos la data al state
            setPostulations(data.data);
        }
        searchPostulations();
    }, []);
    // Retorno al cliente
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full text-center text-3xl uppercase font-bold my-4">
                    <h2>Postulaciones</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="col-span-4 grid grid-cols-4 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-1">
                            <p>Nombre y Apellido</p>
                        </div>
                        <div className="col-span-1">
                            <p>Correo Electronico</p>
                        </div>
                        <div className="col-span-1">
                            <p>Fecha de Postulación</p>
                        </div>
                        {/* <div className="col-span-1">
                            <p>Accion</p>
                        </div> */}
                    </div>
                    {postulations.map( (postulation,index) => <PostulationListCard key={index} admin={false} postulation={postulation}/>)}
                </div>
            </div>
        </>
    )
}
// Exportar pagina
export default PostulationsList;