// Importaciones
import { useNavigate } from "react-router-dom"
// Componente
const EmploymentCard = ({
        company,
        employment
    }) => {
    // Declaracion del navegador
    const navigate = useNavigate();
    // Retorno
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-5 flex mx-auto my-5" style={{width:"95%"}}>
                <div className="grid grid-cols-3 gap-2 w-full items-center">
                    <div className="flex col-span-2">
                        <img 
                            src="/public/img/generic-user.png" 
                            alt="imagen-perfil" 
                            className="rounded-full w-24 h-24 border-color4 border-2 cursor-pointer" 
                            style={{width:"96px", height:"96px"}}
                        />
                        <div className="mx-4 flex flex-col justify-evenly">
                            <div>
                                <h2 className="font-bold text-2xl">{company.name}</h2>
                            </div>
                            <div>
                                <p className="text-sm">{employment.description}</p>
                                <em className="text-sm font-bold text-slate-500">{employment.create_date}</em>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {/* Estatus y Vacantes*/}
                        <div className="flex justify-between text-center">
                            <div className="flex flex-col mx-2">
                                <p className="font-bold uppercase">Estatus</p>
                                <p className="text-sm">{employment.status}</p>
                            </div>
                            <div className="flex flex-col mx-2">
                                <p className="font-bold uppercase">Vacantes</p>
                                <p className="text-sm">{employment.vacancies}</p>
                            </div>
                        </div>
                        {/* Ver empleo */}
                        <div className="flex justify-center">
                            <button 
                                className="bg-color3 rounded-full border-2 border-color4 text-white font-bold w-2/3 my-3 shadow uppercase mx-auto py-2 text-sm"
                                onClick={() => navigate(`/inicio/ver-empleo/${employment.id}`)}
                            >
                                Ver Empleo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// Se exporta el componente
export default EmploymentCard