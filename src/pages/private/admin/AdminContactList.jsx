import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/public/Spinner.jsx";
import clienteAxios from "../../../config/axios";
import Alert from "../../../components/public/Alert.jsx";
import ContactRow from "../../../components/private/cards/ContactRow.jsx";

const AdminContactList = () => {

    const [contactList, setContactList] = useState([]);
    const [alerta, setAlert] = useState(null);

    useEffect(()=> {
        const searchContacts = async()=> {
            const { data } = await clienteAxios("/get-contacts");
            if(!data){
                setAlert({
                    error: true,
                    message: "Hubo un error al realizar la petición, por favor refresque la pagina"
                });
            }

            if (data.error) {
                setAlert({
                    error: true,
                    message: data.message
                });
            }

            setContactList(data.result);
        }
        searchContacts();
    },[]);

    return (
        <div className="w-full my-5">
            <div>
                <h2 className="uppercase font-bold text-3xl text-center my-5">Contactos</h2>
                <Link
                    to="/inicio/control/contactos/nuevo"
                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 text-md flex self-end w-52"
                >
                    Crear un Contacto
                </Link>
            </div>
            { alerta ? <Alert alerta={alerta}/>:(
                <>
                    {
                        contactList.length === 0 ? 
                            <Spinner/>: (
                                <>
                                    <div 
                                        className="grid grid-cols-12 gap-2 bg-white w-full md:w-5/6 md:mx-auto text-center my-2 p-3 hover:bg-slate-100 transition-all cursor-pointer font-bold uppercase shadow rounded"
                                    >
                                        <p className="col-span-3">Nombre y Apellido</p>
                                        <p className="col-span-3">Tipo de Contacto</p>
                                        <p className="col-span-3">Contacto</p>
                                        <div className="col-span-3 flex justify-center"></div>
                                    </div>
                                    {contactList.map( contact => <ContactRow 
                                                                    contact={contact} 
                                                                    setContactList={setContactList} 
                                                                    contactList={contactList}
                                                                />)}
                                </>
                            )
                    }
                </>
            )
            }
        </div>
    );
}

export default AdminContactList;