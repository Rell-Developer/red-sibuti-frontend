// Librerias
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// Card
import PostulationListCard from "../../components/private/cards/PostulationListCard.jsx";
import clienteAxios from "../../config/axios.jsx";
// Pagina
const PostulationsList = () => {

    const [postulations, setPostulations] = useState([]);
    const params = useParams();

    useEffect(()=>{
        const searchPostulations = async() =>{
            let {data} = await clienteAxios(`/get-employment-postulation/${params.id}`);
            // console.log(data);
            setPostulations(data.data);
        }
        searchPostulations();
    }, []);

    return (
        <>
            <div className="w-full my-5">
                <div className="w-full text-center text-3xl uppercase font-bold my-4">
                    <h2>Postulaciones</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="col-span-3 grid grid-cols-3 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-1">
                            <p>Nombre y Apellido</p>
                        </div>
                        <div className="col-span-1">
                            <p>Correo Electronico</p>
                        </div>
                        <div className="col-span-1">
                            <p>Fecha de Postulación</p>
                        </div>
                    </div>
                    {postulations.map( postulation => <PostulationListCard postulation={postulation}/>)}
                </div>
            </div>
        </>
    )
}
// Exportar pagina
export default PostulationsList