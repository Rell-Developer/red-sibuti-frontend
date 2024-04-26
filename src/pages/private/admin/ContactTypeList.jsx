import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/public/Spinner.jsx";
import Alert from "../../../components/public/Alert.jsx";
import clienteAxios from "../../../config/axios";
import ContactTypesRow from "../../../components/private/cards/ContactTypesRow.jsx";

const ContactTypeList = () => {
    // Hooks
    const [alerta, setAlerta] = useState(null);
    const [typesList, setTypesList] = useState([]);
    const [loading, setLoading] = useState(false);
    // Al renderizar
    useEffect(()=>{
        const searchContactTypes = async()=> {
            try {
                const { data } = await clienteAxios("/get-contact-types");

                // Establecer data
                setTypesList(data.result);
            } catch (error) {
                console.error(error.message);
            }
        }
        searchContactTypes();
    }, []);
    // Retorno
    return (
        <div className="w-full my-5">
            <div>
                <h2 className="uppercase font-bold text-3xl text-center my-5">Tipos de Contactos</h2>
                <Link
                    to="/inicio/control/tipos-contactos/nuevo"
                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 text-md flex self-end w-72"
                >
                    Crear un Tipo de Contacto
                </Link>
            </div>
            { alerta ? <Alert alerta={alerta}/>:(
                <>
                    {
                        loading ? <Spinner/>:(
                            <>
                                {
                                    typesList.length === 0 ? (
                                            <div>
                                                <p className="text-center text-2xl uppercase">
                                                    No hay tipos de contactos registrados
                                                </p>
                                            </div>
                                        ): (
                                            <>
                                                <div 
                                                    className="grid grid-cols-12 gap-2 bg-white w-full md:w-5/6 md:mx-auto text-center my-2 p-3 hover:bg-slate-100 transition-all cursor-pointer font-bold uppercase shadow rounded"
                                                >
                                                    <p className="col-span-5">Nombre</p>
                                                    <p className="col-span-4">Cantidad Maxima por Usuario</p>
                                                    <div className="col-span-3 flex justify-center"></div>
                                                </div>
                                                {typesList.map( contact => <ContactTypesRow 
                                                                                contact={contact} 
                                                                                setTypesList={setTypesList} 
                                                                                typesList={typesList}
                                                                            />)}
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
    )
}

export default ContactTypeList;