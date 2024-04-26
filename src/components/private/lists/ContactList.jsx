import { useEffect, useState } from "react";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios";
import ContactCard from "../cards/ContactCard.jsx";

const ContactList = ({ user }) => {

    // Lista de Contacto
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const searchContacts = async () => {
            try {
                const { data } = await clienteAxios(`/get-user-contacts/${user.id}`);

                // console.log(data);
                if (data.error) {
                    console.log("Hubo un error");
                    return setLoading(false);
                }

                if (data.result.length > 0) {
                    setContacts(data.result);
                }
                return setLoading(false);
            } catch (error) {
                console.log("Hubo un error al cargar los servicios");
                console.error(error.message);
            }
        };

        searchContacts();
    }, [])

    return (
        <>
            <section className="my-5 grid-cols-6">
                <div className="m-5 col-span-6">
                    <h3 className="text-lg uppercase text-color5 font-bold">Contactos</h3>
                    {
                        loading ? (
                            <Spinner />
                        ):(
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                                    {
                                        contacts.length > 0 ? (
                                            <>
                                                {
                                                    contacts.map( cont => 
                                                        <ContactCard 
                                                            key={cont.id}
                                                            contact={cont} 
                                                            contactList={{contacts, setContacts}} 
                                                            isNewContact={false}
                                                            isOwner={user.id === JSON.parse(sessionStorage.getItem("user")).id}/>
                                                    )
                                                }
                                            </>
                                        ):(
                                            <>
                                                {
                                                    user.id !== JSON.parse(sessionStorage.getItem("user")).id && (
                                                        <div className="col-span-full text-center uppercase">
                                                            <h3>Aún no ha registrado un método de contacto</h3>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }

                                    {
                                        (user.id === JSON.parse(sessionStorage.getItem("user")).id && contacts.length < 6) && (
                                            <ContactCard 
                                                contact={{}} 
                                                contactList={{contacts, setContacts}} 
                                                isNewContact={true}/>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default ContactList;