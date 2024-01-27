import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import clienteAxios from "../../../config/axios.jsx";

const ContactRow = ({contact, setContactList, contactList}) => {
    // Eliminar el contacto
    const deleteContact = async(id) => {
        try {
            // Se realiza la pregunta
            const pregunta = confirm("¿Esta seguro que desea eliminar este contacto?");
            // Validacion
            if (pregunta) {
                // Se realiza la peticion
                const { data } = await clienteAxios.delete(`/delete-contact/${id}`);
                // se valida la peticion
                if (data.error) {
                    alert(data.message);
                    return
                }
                // console.log(contactList);
                // Se filtra
                const contacts = contactList.filter(cont => cont.id !== id);                
                // Se actualiza la lista
                setContactList(contacts);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div 
            className="grid grid-cols-12 gap-2 bg-white w-full md:w-5/6 md:mx-auto text-center my-2 p-3 hover:bg-slate-100 transition-all cursor-pointer items-center shadow rounded"
        >
            <Link 
                className="col-span-9 grid grid-cols-12 gap-2"
                to={`/inicio/control/contactos/${contact.id}`}
            >
                <p className="col-span-4">{contact.usuario.firstName} {contact.usuario.lastName}</p>
                <p className="col-span-4">{contact.contact_type.name}</p>
                <p className="col-span-4">{contact.contact}</p>
            </Link>
            <div className="col-span-3 flex justify-center">
                <MdDelete 
                    size={30} 
                    color="#FB0D0D"
                    onClick={() => deleteContact(contact.id)}
                />
            </div>
        </div>
    )
}

export default ContactRow;