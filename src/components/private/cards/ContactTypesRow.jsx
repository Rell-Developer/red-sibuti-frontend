import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import clienteAxios from '../../../config/axios';

const ContactTypesRow = ({
        contact,
        setTypesList,
        typesList
    }) => {
    // Eliminar el contacto
    const deleteContact = async(id) => {
        try {
            // Se realiza la pregunta
            const pregunta = confirm("¿Esta seguro que desea eliminar este tipo de contacto?");
            // Validacion
            if (pregunta) {
                // Se realiza la peticion
                const { data } = await clienteAxios.delete(`/delete-contact-type/${id}`);
                // se valida la peticion
                if (data.error) {
                    alert(data.message);
                    return
                }
                // console.log(contactList);
                // Se filtra
                const contacts = typesList.filter(cont => cont.id !== id);                
                // Se actualiza la lista
                setTypesList(contacts);
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
                className="col-span-9 grid grid-cols-12 gap-2 text-center"
                to={`/inicio/control/tipos-contactos/${contact.id}`}
            >
                <p className="col-span-6">{contact.name}</p>
                <p className="col-span-6">{contact.max}</p>
                {/* <p className="col-span-4">{contact.t}</p> */}
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

export default ContactTypesRow