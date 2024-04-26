// Importaciones
import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import UserCardList from "../../components/private/cards/UserCardList.jsx";

const UsersList = () => {
    // States
    const [users, setUsers] = useState([]);
    // al renderizar la pagina
    useEffect(() => {
        const getUsers = async() => {
            // Se solicitan los usuarios al backend
            let { data } = await clienteAxios('/users');
            // Se agregan los usuarios al state
            setUsers(data);
        }
        getUsers();
    }, []);
    // Retorno
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full text-center text-3xl uppercase font-bold my-4">
                    <h2>Usuarios</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center overflow-scroll" style={{"height":"75vh"}}>
                    <div className="col-span-3 grid grid-cols-3 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-1">
                            <p>Nombre y Apellido</p>
                        </div>
                        <div className="col-span-1">
                            <p>Correo Electronico</p>
                        </div>
                        <div className="col-span-1">
                            <p>Fecha de Creación</p>
                        </div>
                    </div>
                    {users.map( (user, index) => <UserCardList key={index} usuario={user}/>)}
                </div>
            </div>
        </>
    )
}

export default UsersList;