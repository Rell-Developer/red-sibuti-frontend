// Importaciones
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
// Pagina
const Profile = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    useEffect(()=>{
        const searchProfile = async() => {
            try {
                let {data} = await clienteAxios(`/users/${params.id}`);
                console.log(data);
                setUser(data.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        searchProfile();
    },[])
    return (
        <>
            <div className="w-full h-screen">
                <div className="w-1/2 bg-white rounded shadow-lg mx-auto my-5 flex flex-col lg:flex-row p-5">
                    <div className="">
                        <img src="/public/img/generic-user.png" alt="imagen-perfil" className="rounded-full w-36 h-36 border-color4 border-4"/>
                    </div>
                    <div className="flex m-4">
                        <div>
                            <h3 className="text-4xl font-bold uppercase">{user.firstName} {user.lastName}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// Se Exporta la pagina
export default Profile