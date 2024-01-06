// Importaciones
import { useState, useEffect } from "react";
import clienteAxios from "../../../config/axios.jsx";
import EmploymentCard from "../EmploymentCard.jsx";
import Spinner from "../../public/Spinner.jsx";
// Lista
const OpenEmploymentsList = () => {
    // States
    const [employments, setEmployments] = useState([]);
    const [loading, setLoading] = useState(true);
    // Al renderizar la lista
    useEffect(() => {
        const searchEmployments = async () =>{
            if (!employments || employments.length == 0) {
                let {data} = await clienteAxios("/get-open-employments");
                // console.log(data);
                setEmployments(data.data);
                setLoading(false)
            }
        }

        searchEmployments();
    }, [])
    return (
        <>
            {/* Vista de Empleos */}
            <div className="w-full col-span-2 flex flex-col" style={{height: "91vh"}}>
                {/* Buscador */}
                {/* <div className="w-full">
                    <div className="w-full mt-5 mx-auto bg-color4 rounded-xl shadow-lg p-5">
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            className="p-3 rounded-full w-full font-bold border-2 border-color2" 
                            placeholder="ESCRIBA LO QUE QUIERA BUSCAR"/>
                    </div>
                </div> */}
                {/* Resultados de los empleos*/}
                <div className="w-full overflow-scroll">
                    { loading ? (<Spinner/>):(
                        <>
                            {/* Componente del empleo */}
                            {
                                employments.map((employment,index) => <EmploymentCard
                                    key={index}
                                    company={{
                                        id: employment.id,
                                        name:employment.usuario.firstName,
                                        verifiedToken:employment.usuario.verifiedToken,
                                        verifiedAccount:employment.usuario.verifiedAccount
                                    }}   
                                    employment={{
                                        id: employment.id,
                                        description: employment.description,
                                        create_date: employment.createdAt,
                                        status:`${employment.status === "open" ? "Abierto":"Cerrado"}`,
                                        vacancies:employment.vacancies,
                                        postulations:employment.postulations,
                                        state_name: employment.state_name,
                                        municipality_name: employment.municipality_name,
                                        parish_name: employment.parish_name,
                                    }}
                                />)
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default OpenEmploymentsList