// Importaciones
import { useParams, useNavigate, json } from "react-router-dom";
import { useEffect, useState } from "react";
// Componentes
import Spinner from "../../components/public/Spinner.jsx";
import clienteAxios from "../../config/axios.jsx";
import Alert from "../../components/public/Alert.jsx";
// Pagina
const ViewEmployment = () => {
    // States
    const [loading, setLoading]=useState(true);
    const [employment, setEmployment] = useState({});
    const [queryStatus, setQueryStatus] = useState(true);
    const [alerta, setAlerta] = useState(false);
    const [user, setUser] = useState({});

    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const searchEmployment = async()=>{
            try {
                let user = JSON.parse(sessionStorage.getItem("user"));
                setUser(user);
                let {data} = await clienteAxios.post(`/get-employments/${params.id}`, {user_id:user.id});
                console.log(data);

                if (data.error) {
                    setQueryStatus(false);
                    return setLoading(false);
                }

                setEmployment(data.data);
                setLoading(false)
            } catch (error) {
                console.log(error.message);
            }
        }

        searchEmployment();
    },[])

    // Accion para postularse al trabajo
    const Apply = async() => {
        try {
            setLoading(true);
            let user = sessionStorage.getItem("user");
            if (!user) {
                sessionStorage.clear();
                return navigate("/");
            }
            user = JSON.parse(user);

            let {data} = await clienteAxios.post("/apply-employment", {employment_id: params.id, user_id: user.id});
            console.log(user);
            console.log(data);
            setEmployment({...employment, isPostulated: true});
            setAlerta({error:data.error, message: data.message});
            setLoading(false);

            setTimeout(() => setAlerta(false), 5000);
        } catch (error) {
            console.log(error.message);
        }
    }

    const checkVerfiedUser = () => {
        try {
            // Sacamos los datos del usuario de la sesion iniciada
            let user = JSON.parse(sessionStorage.getItem("user"));
            // Declaramos la variable que obtendrá el valor booleano
            let userVerified;
            // Si alguno de los dos campos oblitarios para la verificación completa no es verdadero
            // Retornamos falso para que pueda ir a verificar su cuenta
            // Si ninguna de las dos es falsa, quiere decir que el usuario se ha verificado éxitosamente
            !user.verifiedAccount || !user.verifiedToken ? userVerified = false: userVerified = true;
            // Retornamos el valor
            return userVerified;
        } catch (error) {
            // Si hay un error, mostramos el error en consola
            console.error(error.message);
            // Retornamos el valor
            return false
        }
    }
    // Funcion para retornar si eres el creador del empleo
    const checkCreateEmployment = () =>{
        try {
            // Sacamos los datos del usuario de la sesion iniciada
            let user = JSON.parse(sessionStorage.getItem("user"));
            // Verificacion si el usuario es el creador del empleo
            if (!user || !user.id || employment.usuarioId === parseInt(user.id)) {
                // Si es, retornamos true para que no se muestre
                return true    
            }
        } catch (error) {
            // Si hay un error, mostramos el error en consola
            console.error(error.message);
            // Retornamos el valor
            return true
        }
    }

    // Retorno
    return (
        <>
            <div className="w-full h-full flex justify-center py-5">
                <div className={`${!loading || queryStatus? "justify-around":"justify-center"} w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col p-10`}>
                    {alerta && <Alert alerta={alerta}/>}
                    {loading ? (
                        <Spinner/>
                    ):(
                        <>
                            {
                                !queryStatus ? (
                                    <div className="w-full flex justify-center flex-col items-center">
                                        <div className="my-5">
                                            <h2 className="text-2xl font-bold uppercase">Empleo no encontrado o invalido</h2>
                                        </div>
                                        <div className="w-5/6 mx-auto flex justify-center">
                                            <button 
                                                className="bg-color6 rounded-lg font-bold text-white uppercase w-1/2 py-3 shadow"
                                                onClick={() => navigate("/inicio")}
                                                >Regresar</button>
                                        </div>
                                    </div>
                                ):(
                                    <>
                                        {/* Informacion de la empresa, titulo y empleo */}
                                        <div className="uppercase grid grid-cols-6 mb-5">
                                            {/* Empresa, titulo y ubicacion */}
                                            <div className="col-span-4 grid grid-cols-6">
                                                <div className="col-span-6 flex">
                                                    <img src="/public/img/generic-user.png" alt="imagen-perfil" className="rounded-full w-28 h-28 border-color4 border-2"/>
                                                    <div className="flex flex-col justify-center mx-5">
                                                        {/* Nombre de la empresa */}
                                                        <h3 className="text-3xl font-bold">{employment.usuario.firstName}</h3>
                                                        {/* ubicacion */}
                                                        {/* <p className="text-sm">San Juan de los Morros, Guarico, Venezuela</p> */}
                                                    </div>
                                                </div>
                                                {/* <div className="col-span-4 flex flex-col justify-center">
                                                </div> */}
                                            </div>
                                            {/* Estatus y Vacantes */}
                                            <div className="col-span-2 flex justify-center items-center">
                                                <div className="flex justify-center text-center">
                                                    <div className="flex flex-col mx-3">
                                                        <p className="font-bold">Estatus</p>
                                                        <small>{employment.status === "open" ? "Abierto":"Cerrado" }</small>
                                                    </div>

                                                    <div className="flex flex-col mx-3">
                                                        <p className="font-bold">Vacantes</p>
                                                        <small>{employment.vacancies}</small>
                                                    </div>

                                                    <div className="flex flex-col mx-3">
                                                        <p className="font-bold">Postulados</p>
                                                        <small>{employment.postulations}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Mas Informacion del trabajo */}
                                        <div className="w-full my-2 p-3 overflow-scroll px-5">
                                            <p>
                                                {employment.description}
                                            </p>
                                        </div>
                                        {/* Acciones */}
                                        <div className="w-100 flex justify-between">
                                            <button 
                                                className="rounded-lg bg-color6 text-white py-3 px-5 font-bold uppercase mx-2 shadow"
                                                onClick={()=>navigate("/inicio")}
                                                >
                                                cerrar
                                            </button>
                                            {
                                                // Verificar si eres un usuario comun
                                                user.rol === "common" && (
                                                    <>
                                                        {/* Funcion para verificar que no eres el creador del empleo */}
                                                        {
                                                            !checkCreateEmployment() && (
                                                                <>
                                                                    {
                                                                        checkVerfiedUser() ? (
                                                                            <>
                                                                                {
                                                                                    employment.isPostulated ? (
                                                                                        <>
                                                                                            <p
                                                                                                className="font-bold uppercase py-3 px-5 rounded-lg"
                                                                                            >Ya te has postulado a este trabajo</p>
                                                                                        </>
                                                                                    ):(
                                                                                        <button 
                                                                                            className="rounded-lg bg-color4 text-white py-3 px-5 font-bold uppercase mx-2 shadow"
                                                                                            onClick={() => Apply()}
                                                                                        >postularme</button>
                                                                                    )
                                                                                }
                                                                            </>
                                                                        ):(
                                                                            <>
                                                                                <p
                                                                                    className="font-bold uppercase py-3 px-5 rounded-lg"
                                                                                >Su cuenta debe estar verificada para poder postularse</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ViewEmployment