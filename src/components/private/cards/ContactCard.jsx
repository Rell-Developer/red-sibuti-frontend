import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from '../../../config/axios.jsx';
import Spinner from "../../public/Spinner.jsx";

const ContactCard = ({
        contact, 
        // editMode = false, 
        isNewContact = true,
        contactList,
        isOwner
    }) => {

    const [newContact, setNewContact] = useState({
        contactTypeId: "",
        contact:""
    });
    const [createMode, setCreateMode] = useState(false);
    const [contactTypes, setContactTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const params = useParams();

    // useEffect(() => {
    //     setIsActive(service.isActive);
    // }, [])
    

    // Acciones
    // Cambio de modo
    const changeMode = async () => {
        try {
            setCreateMode(true);
            if (contactTypes.length < 1) {
                const { data } = await clienteAxios('/get-contact-types');
                setContactTypes(data.result);
            }
            setLoading(false);
            // isNewContact = true
            if (contact?.id > 0) {
                console.log(contact);
                setNewContact({
                    contactTypeId: contact["contact_type"]["id"],
                    contact: contact["contact"]
                })
                setEditMode(true);
            }
        } catch (error) {
            console.error(error.message);
            setContactTypes([]);
        }
    }

    // Guardar la oferta de servicio
    const handleSubmit = async() => {
        try {
            // Colocamos el spinner de cargando
            setLoading(true);
            if (Object.values(newContact).includes("")) {
                // Colocamos un mensaje en la tarjeta
                setMessageInCard({
                    error:true,
                    message:"Todos los campos son obligatorios"
                });
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
                return
            }
            
            // Realizamos la peticion
            if (contact.id) {
                const { data } = await clienteAxios.put(`/update-contact/${contact.id}`, {
                    ...newContact, 
                    usuarioId: params.id
                });
                // Colocamos un mensaje en la tarjeta
                setMessageInCard(data);
                // setNewContact({
                //     contactTypeId: data.result.contactTypeId,
                //     contact: data.result.contact
                // })
                contact = {
                    contactTypeId: data.result.contactTypeId,
                    contact: data.result.contact
                }
                setTimeout(() => {
                    setNotification(null);
                    setEditMode(false);
                }, 3000);
            }else{
                const { data } = await clienteAxios.post('/create-contact', {
                    ...newContact, 
                    usuarioId: params.id
                });
                // Colocamos un mensaje en la tarjeta
                setMessageInCard(data);
                // Y luego de unos segundos, colocamos el servicio en frontend
                setTimeout(() => {    
                    setNotification(null);
                    // serviceList.setServices( serv => [...serv, service]);
                    contactList.setContacts( cont => [...cont, {...newContact, id: data.result.id}]);
                }, 3000);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // Cambiar estatus del servicio
    const changeStatus = async (isActive) => {
        try {
            setLoading(true);

            setTimeout(async () => {
                const { data } = await clienteAxios.put(`/change-status-service/${service.id}`, { isActive });
    
                if (data.error) {
                    console.error(data.message);
                    setLoading(false);
                    return
                }
    
                service = {
                    ...service,
                    isActive
                }
    
                setIsActive(isActive);

                setLoading(false);
                // setCreateMode(true);
                // setMessageInCard(data);
    
                // setTimeout(() => {
                //     isnewContact = false;
                //     setNotification(null)
                // }, 5000);
            }, 2000);
            console.log("Cambiando el valor del estatus");
        } catch (error) {
            console.log(error.message);
        }
    }

    const setMessageInCard = (data) => {
        setNotification({
            message: data.message,
            error: data.error
        });
        
        setLoading(false);
        isNewContact = false;
        setCreateMode(false);

        setNewContact({
            contactTypeId: "",
            contact:""
        });
    }

    const discardChanges = () => {
        setNewContact({
            contactTypeId: "",
            contact:""
        });
        if (!contact.id) {
            setCreateMode(false);
        }else{
            setEditMode(false);
            setCreateMode(false);
        }
        
    }

    // Borrar contacto
    const deleteContact = async() => {
        // Pregunta
        const areSure = confirm("¿Esta segur@ que quiere eliminar este contacto?");
        // En caso de que si
        if (areSure) {
            setLoading(true);
            // Realizamos la peticion http
            const { data } = await clienteAxios.delete(`/delete-contact/${contact.id}`);
            // Colocamos un mensaje en la tarjeta
            // setMessageInCard({
            //     error:data.error,
            //     message:data.message
            // });
            // Validamos
            if (data.error) {
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
                return
            }
            setTimeout(()=> {
                // setLoading(false);
                // Filtramos
                const newContactList = contactList.contacts.filter( cont => cont.id !== contact.id);
                // Actualizamos el frontend
                contactList.setContacts(newContactList);
            },2000);
        }
    }

    return (
        <>
            {/* Carta principal */}
            <div 
                className={`
                    col-span-1 shadow-lg rounded-lg border w-5/6 mx-auto grid grid-cols-6 gap-4 p-5 transition-all items-center
                    ${!isNewContact? '':`
                        ${createMode ? '':`
                            bg-opacity-25 cursor-pointer
                            hover:shadow-xl hover:border-2 hover:border-color4 hover:transform hover:scale-105
                        `}
                    `}
                `}
            >
                {
                    loading ? (
                        <div className="col-span-full">
                            <Spinner/>
                        </div>
                    ):(
                        <>
                            {/* Si no es el boton de nuevo servicio, es una tarjeta de servicio */}
                            {
                                !isNewContact && !editMode ? (
                                    // Informacion del servicio
                                    <>
                                        <div className="col-span-full">
                                            <h3 className="uppercase font-bold">
                                                { contact?.contactName || contact["contact_type"]["name"] }
                                            </h3>
                                        </div>
                                        <div className="col-span-full">
                                            <p>
                                                { contact["contact"]}
                                            </p>
                                        </div>
                                        <div className="col-span-full">
                                            {
                                                isOwner && (
                                                    <>
                                                        <button
                                                            className={`${!isActive ? "bg-color4":"bg-red-600"}  
                                                                text-white font-bold rounded p-2 mx-auto text-sm uppercase w-full`
                                                            }
                                                            onClick={() => changeMode()}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className={`bg-red-600 text-white font-bold rounded p-2 mx-auto text-sm uppercase w-full my-2`}
                                                            onClick={() => deleteContact()}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </>
                                ):(
                                    <>
                                        {
                                            !createMode ? (
                                                <>
                                                    {
                                                        !notification ? (
                                                            // El boton de nuevo contacto
                                                            <div className="col-span-full text-center" onClick={() => changeMode()}>
                                                                <h3 className="uppercase">
                                                                    Agrega un nuevo contacto
                                                                </h3>
                                                                <div className="flex justify-center">
                                                                    <svg width="40" dataSlot="icon" aria-hidden="true" fill="#38A3A5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" fillRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            // La notificacion
                                                            <div className="col-span-full text-center flex flex-col justify-center items-center">
                                                                <h3 className="uppercase">{ notification.message }</h3>
                                                                {
                                                                    notification.error ? (
                                                                        <svg width={"40"} dataSlot="icon" aria-hidden="true" fill="#FF0000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path clipRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fillRule="evenodd" />
                                                                        </svg>
                                                                    ):(
                                                                        <svg width={"40"} dataSlot="icon" aria-hidden="true" fill="#38A3A5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" fillRule="evenodd" />
                                                                        </svg>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                
                                                </>
                                            ):(
                                                <div className="col-span-full">
                                                    {loading ? (<Spinner/>):(
                                                        // Formulario de nuevo servicio
                                                        // <div className="col-span-full">
                                                        <>
                                                            <div className="w-full flex flex-col my-2">
                                                                <label htmlFor="contact" className="font-bold">Tipo de Contacto</label>
                                                                <select 
                                                                    id="contact" 
                                                                    name="contact" 
                                                                    className="bg-white border rounded p-1 my-1"
                                                                    value={newContact.contactTypeId}
                                                                    onChange={e => setNewContact({
                                                                        ...newContact, 
                                                                        contactTypeId: e.target.value, 
                                                                        contactName: e.target.selectedOptions[0].textContent
                                                                    })}
                                                                >
                                                                    <option value="">Seleccione un tipo de contacto</option>
                                                                    {
                                                                        contactTypes.map( cont => <option value={cont.id}>{cont.name}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="contact" className="font-bold">Contacto</label>
                                                                <input 
                                                                    id="contact" 
                                                                    name="contact" 
                                                                    className="w-full bg-white border rounded p-2 my-1"
                                                                    value={newContact?.contact}
                                                                    onChange={ e => setNewContact({...newContact, contact: e.target.value})}
                                                                />
                                                            </div>
                                                            <button 
                                                                className="bg-color4 font-bold text-white rounded px-3 py-1 w-full"
                                                                onClick={() => handleSubmit()}>Guardar</button>
                                                            <button 
                                                                className="bg-color6 font-bold text-white rounded px-3 py-1 w-full my-2"
                                                                onClick={() => discardChanges()}>Descartar</button>
                                                        </>
                                                    )}
                                                </div>
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

export default ContactCard;