// Importaciones
import { useEffect, useState } from "react";
import EmploymentCard from "../../components/private/EmploymentCard.jsx";
import clienteAxios from "../../config/axios.jsx";

// Layout para la seccion de empleos y servicios
const SecondLayout = () => {

    const [employments, setEmployments] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        // console.log(JSON.parse(sessionStorage.getItem("user")));
        const searchEmployments = async () =>{
            let {data} = await clienteAxios("/get-employments");
            console.log(data);
            setEmployments(data.data);
        }

        searchEmployments();
    }, [])
    
    
    return (
        <div className="w-full grid grid-cols-4 gap-4 mx-auto">
            {/* <div className="bg-gray-900 bg-opacity-50 absolute z-10 w-full h-screen flex justify-center items-center">
                <div className="text-white bg-white w-1/2 h-1/2 rounded-lg">
                    modal
                </div>
            </div> */}
            {/* Vista Previa del Usuario */}
            <div className="w-full" style={{height: "91vh"}}>
                <div className="bg-white rounded-lg border-2 border-color3 w-5/6 mx-auto mt-5 p-4 shadow-lg">
                    <div className="mx-auto w-5/6">
                        <div className="mx-auto">
                            <img src="/public/img/generic-user.png" alt="imagen-perfil" className="rounded-full w-36 h-36 border-color4 border-4 mx-auto"/>
                        </div>
                        <div className="mx-auto bg-color4 p-5 rounded-lg shadow-lg" style={{marginTop: "-70px"}}>
                            <div className="text-center" style={{marginTop:"60px"}}>
                                <div className="text-white">
                                    <p className="uppercase font-bold text-lg">NOMBRE COMPLETO</p>
                                    <p className="mt-2 text-sm">{user.name}</p>
                                </div>
                                {/* <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">EDAD</p>
                                    <p className="mt-2 text-sm">22 años</p>
                                </div>
                                <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">OCUPACION</p>
                                    <p className="mt-2 text-sm">Programador</p>
                                </div>
                                <div className="text-white mt-4">
                                    <p className="uppercase font-bold text-lg">Contacto</p>
                                    <p className="mt-2 text-sm">RED-SIBUTI - CHAT</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Vista de Empleos */}
            <div className="w-full col-span-2 flex flex-col" style={{height: "91vh"}}>
                {/* Buscador */}
                <div className="w-full">
                    <div className="w-full mt-5 mx-auto bg-color4 rounded-xl shadow-lg p-5">
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            className="p-3 rounded-full w-full font-bold border-2 border-color2" 
                            placeholder="ESCRIBA LO QUE QUIERA BUSCAR"/>
                    </div>
                </div>
                {/* Resultados de los empleos*/}
                <div className="w-full">
                    {/* Componente del empleo */}
                    {
                        employments.map(employment => <EmploymentCard
                            company={{
                                id: employment.id,
                                name:employment.usuario.firstName
                            }}   
                            employment={{
                                id: employment.id,
                                description: employment.description,
                                create_date: employment.createdAt,
                                status:`${employment.status === "open" ? "Abierto":"Cerrado"}`,
                                vacancies:employment.vacancies
                            }}
                        />)
                    }
                </div>
            </div>
            {/* Ranking y Chat */}
            <div className="bg-color3 w-full" style={{height: "91vh"}}>En Desarrollo</div>
        </div>
    )
}
// Exportacion de layout
export default SecondLayout