import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../../config/axios.jsx";
import EmploymentCardControl from "../../components/private/cards/EmploymentCardControl.jsx";
// Pagina
const Employments = () => {

    // usestates
    const [empleos, setEmpleos] = useState([]);

    // useeffect
    useEffect(() => {
        const searchEmployments = async() => {
            let user = JSON.parse(sessionStorage.getItem("user")); 
            const {data} = await clienteAxios.post("get-employments", { 
                usuarioId: user.id,
                all: user.rol === "company" ? false: true
            });
            console.log(data);

            setEmpleos(data.data);
        }
        searchEmployments();
    }, [])
    
    return (
        <>
            <div className="w-5/6 my-10">
                <div className="text-center">
                    <h2 className="font-bold text-3xl text-color5">ADMINISTRA TUS EMPLEOS</h2>
                </div>

                <div>
                    <Link to="/inicio/control/empleos/nuevo">
                        <button className="bg-color4 rounded shadow-lg p-2 font-bold text-white">AGREGAR NUEVO EMPLEO</button>
                    </Link>
                </div>

                <div className="grid grid-cols-12 gap-4 my-5">
                    {
                        empleos.map(empleo => <EmploymentCardControl employment={empleo}/>)
                    }
                </div>
            </div>
        </>
    )
}
// Exportar Pagina
export default Employments