// Importaciones
import EmploymentCard from "../../components/private/EmploymentCard.jsx";

// Layout para la seccion de empleos y servicios
const SecondLayout = () => {
    return (
        <div className="w-full grid grid-cols-4 gap-4 mx-auto">
            {/* Vista Previa del Usuario */}
            <div className="w-full" style={{height: "91vh"}}>
                <div className="bg-white rounded-lg border-2 border-color3 w-5/6 mx-auto mt-5 p-4 shadow-lg">
                    <div className="mx-auto w-5/6">
                        <div className="mx-auto">
                            <img src="/public/img/lolazo.png" alt="imagen-perfil" className="rounded-full w-36 h-36 border-color4 border-4 mx-auto"/>
                        </div>
                        <div className="mx-auto bg-color4 p-5 rounded-lg shadow-lg" style={{marginTop: "-70px"}}>
                            <div className="text-center" style={{marginTop:"60px"}}>
                                <div className="text-white">
                                    <p className="uppercase font-bold text-lg">NOMBRE COMPLETO</p>
                                    <p className="mt-2 text-sm">Roque Emilio Lopez Loreto</p>
                                </div>
                                <div className="text-white mt-4">
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
                                </div>
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
                    <EmploymentCard
                        company={{
                            id:"0",
                            name:"NOKIA"
                        }}   
                        employment={{
                            description:"asdasdasdasdasdasdasdasdasdasdasdasdasdasd",
                            create_date:"25/08/2023",
                            status:"Abierto",
                            vacancies:"2"
                        }}
                    />
                </div>
            </div>
            {/* Ranking y Chat */}
            <div className="bg-color3 w-full" style={{height: "91vh"}}>Chat</div>
        </div>
    )
}
// Exportacion de layout
export default SecondLayout