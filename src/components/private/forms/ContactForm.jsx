// Importaciones
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../../public/Alert.jsx";
import clienteAxios from "../../../config/axios";
import Spinner from "../../public/Spinner.jsx";

// Componente
const ContactForm = () => {
    // useState
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(null);
    const [contact, setContact] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [UsersList, setUsersList] = useState([]);
    const [contactTypes, setContactTypes] = useState([]);
    // Parametros del link
    const params = useParams();
    // UseEffect
    useEffect(()=> {
        // let position = searchPosition();
        // setPosition(position);
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !contact.name) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            
            const searchPosition = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-contact/${params.id}`);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                // Establecemos la data guardada
                setContact(data.result);
            }
            // Buscamos el search position
            searchPosition();
        }

        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("contactos/")[1] === "nuevo") {
            establecerEditMode();
        }

        setLoading(false);
    },[]);
    // Navegador
    const navigate = useNavigate();
    
    // Al guardar los cambios
    const onSubmit = async (dataContact) => {
        try {
            setLoading(true);
            // Validacion
            if (Object.values(dataContact).includes("") || Object.values(dataContact).length === 0) {
                setLoading(false);
                setAlerta({error: true, message:"Todos los campos son obligatorios"});
                return setTimeout(() => setAlerta(null), 2000);
            }
            // console.log(dataContact);
            // console.log(Object.values(dataContact));
            // return
            // Establecemos una ruta dinamica
            let infoPosition;
            // let name = `${dataContact.contact[0].toUpperCase()}${dataContact.contact.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/update-contact/${params.id}`, { 
                    contact: contact.contact,
                    contactTypeId: contact.contactTypeId,
                    usuarioId: contact.usuarioId,
                });
                infoPosition = data;
            }
            if (window.location.pathname.split("contactos/")[1] === "nuevo") {
                let { data } = await clienteAxios.post("/create-contact", { 
                    contact: contact.contact,
                    contactTypeId: contact.contactTypeId,
                    usuarioId: contact.usuarioId,
                });
                infoPosition = data;
            }
            // si hay un error, lo mostramos
            if (infoPosition.error) {
                setLoading(false);
                setAlerta({error:true, message: infoPosition.message});
                setTimeout(() => setAlerta(null), 2000);
                return
            }
            // Agregamos el mensaje de exito
            setAlerta({error:false, message: infoPosition.message});
            setEditMode(false);
            setLoading(false);
            setContact('');
            // En 2 segundos regresamos a la lista
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/contactos");
            }, 2000);
        } catch (error) {
            console.error(error.message);
        }
    }
    // Establecer el modo edicion
    const establecerEditMode = async() => {
        try {
            if (!editMode) {
                if (UsersList.length === 0) {
                    const { data } = await clienteAxios("/users");
                    // console.log(data);
                    setUsersList(data);
                }

                if (contactTypes.length === 0) {
                    const { data } = await clienteAxios("/get-contact-types");

                    setContactTypes(data.result);
                }
            }
            setEditMode(!editMode);
        } catch (error) {
            console.error(error.message);
        }
    }
    // Retorno
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-96 items-center p-5">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(contact);
                }} 
                className='mx-auto w-full md:w-5/6'
            >
                {
                    loading == null ? (
                        <Spinner/>
                    ):(
                        <>
                            { 
                                alerta ? <Alert alerta={alerta}/>:(
                                    <div className="grid grid-cols-12 gap-4">
                                        {/* Nombre de la persona */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="name" className="font-bold text-lg text-center">Propietario</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <select 
                                                            id="name"
                                                            type="text"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                            placeholder="Ingrese el contacto"
                                                            // value={contact.usuarioId || !contact.usuario.id ? "":contact.usuario.id}
                                                            value={contact.usuarioId}
                                                            onChange={(e) => setContact({ ...contact, usuarioId: e.target.value})}
                                                        >
                                                            <option value="">Seleccione un usuario</option>
                                                            {
                                                                UsersList.length > 0 && UsersList.map( user => <option value={user.id}>{user.firstName} {user.lastName} - {user.identification}</option>)
                                                            }
                                                        </select>
                                                    </>
                                                ):(
                                                    <p className="text-center">{contact?.usuario?.firstName} {contact?.usuario?.lastName}</p>
                                                )
                                            }
                                        </div>
                                        {/* Tipo de Contacto */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="contactType" className="font-bold text-lg text-center">Tipo de Contacto</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <select 
                                                            id="contactType"
                                                            type="text"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                            placeholder="Ingrese el contacto"
                                                            value={contact.contactTypeId}
                                                            onChange={(e) => setContact({ ...contact, contactTypeId: e.target.value})}
                                                        >
                                                            <option value="">Seleccione un tipo de contacto</option>
                                                            {
                                                                contactTypes.length > 0 && contactTypes.map( contact => <option value={contact.id}>{contact.name}</option>)
                                                            }
                                                        </select>
                                                    </>
                                                ):(
                                                    <p className="text-center">{contact?.contact_type?.name}</p>
                                                )
                                            }
                                        </div>
                                        {/* Nombre del cargo */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="contact" className="font-bold text-lg text-center">Contacto</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <input 
                                                            id="contact"
                                                            type="text"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                            placeholder="Ingrese el contacto"
                                                            value={!contact.contact ? "":contact.contact}
                                                            onChange={(e) => setContact({ ...contact, contact: e.target.value})}
                                                        />
                                                    </>
                                                ):(
                                                    <p className="text-center">{contact.contact}</p>
                                                )
                                            }
                                        </div>
                                        {/* Boton de guardado */}
                                        {
                                            (editMode) && (
                                                <button 
                                                    type="submit"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                                >Guardar Cambios</button>
                                            )
                                        }
                                        {/* Boton de edicion */}
                                        {
                                            (params.id && !editMode) && (
                                                <button 
                                                    type="button"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        establecerEditMode();
                                                    }}
                                                >Editar</button>
                                            )
                                        }
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                            onClick={() => navigate("/inicio/control/contactos")}
                                        >Regresar</button>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </form>
        </div>
    )
}
// Retornamos el componente
export default ContactForm;