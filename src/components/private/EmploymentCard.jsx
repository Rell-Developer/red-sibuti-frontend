// Importaciones
import { useNavigate } from "react-router-dom";
import dateTransform from "../../hooks/dateTransform.js";
import VerifiedSVG from "../public/svg/VerifiedSVG.jsx";
// import ubicationNameTransform from "../../hooks/ubicationNameTransform.js";
// Componente
const EmploymentCard = ({
        company,
        employment
    }) => {
    // Declaracion del navegador
    const navigate = useNavigate();

    // Transformar la ubicacion del lugar
    const ubicationNameTransform = async(ubication)=>{
        let name = '';
        console.log(ubication);
        // name = (ubication?.parish_name ? ubication?.parish_name:'') + name;
        // name = (ubication?.municipality_name ? ubication?.municipality_name:'') + name;

        return name + ubication?.state_name;
        return 'ejemplo'
    }
    // Retorno
    return (
        <>
            <div className="bg-white border rounded-lg shadow-lg p-5 flex mx-auto my-5" style={{width:"95%"}}>
                <div className="grid grid-cols-4 gap-2 w-full items-center">
                    <div className="flex col-span-2">
                        <img 
                            src={company.imgProfile? `${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${company.imgProfile}`:"/public/img/generic-user.png"}
                            alt="imagen-perfil" 
                            className="rounded-full w-24 h-24 border-color4 border-2 cursor-pointer hidden lg:flex" 
                            style={{width:"96px", height:"96px"}}
                        />
                        <div className="mx-4 flex flex-col justify-evenly">
                            <div className="flex items-center">
                                <h2 className="font-bold text-2xl">{company.name}</h2>
                                {
                                    company.verifiedToken && <VerifiedSVG 
                                            size={30} 
                                            color={
                                                company.verifiedAccount ? "#57CC99":"#aaaaaa"
                                            }
                                        />
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm">{employment.description}</p>
                                <small className="text-gray-800" style={{fontSize: "11px"}}>
                                    { employment.parish_name && 
                                        employment.parish_name !== "" && 
                                            `${employment.parish_name},`
                                    } 
                                    {
                                        employment.municipality_name && 
                                            employment.municipality_name !== "" && 
                                                `${employment.municipality_name},`
                                    }
                                    {employment.state_name}
                                </small>
                                <em className="text-sm font-bold text-slate-500">{dateTransform(employment.create_date)}</em>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
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
                            <div className="flex flex-col mx-2">
                                <p className="font-bold uppercase">Postulados</p>
                                <p className="text-sm">{employment.postulations}</p>
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