import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/public/Spinner.jsx";
import clienteAxios from "../../config/axios.jsx";
// Layout
const ControlLayout = () => {
    // States
    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    // al renderizar el layout
    useEffect(()=>{
        let userJSON = sessionStorage.getItem('user');
        setUser(JSON.parse(userJSON));

        const searchOptions = async()=> {
            try {
                const optionsJSON = await fetch("/src/assets/json/options.json").then( res => res.json());
                // console.log(optionsJSON);
                setOptions(optionsJSON);
            } catch (error) {
                console.error(error.message);
            }
        }

        searchOptions();
    }, []);
    // Retorno del componente
    return (
        <section className="flex w-full h-full">
            <div className="w-1/5">
                <nav className="flex flex-col mx-auto w-5/6 my-5">
                    {
                        options.length > 0 ? (
                            <>
                                {
                                    options.map( opt => 
                                        <>
                                            {
                                                opt.admin ? (
                                                    <>
                                                        {
                                                            user.rol === "admin" && 
                                                                <Link 
                                                                    className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" 
                                                                    to={opt.to}
                                                                >
                                                                    <p className="font-bold text-white mx-2 uppercase">{opt.name}</p>
                                                                </Link>
                                                        }
                                                    </>
                                                ):(
                                                    <Link 
                                                        className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all" 
                                                        to={opt.to}
                                                    >
                                                        <p className="font-bold text-white mx-2 uppercase">{opt.name}</p>
                                                    </Link>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </>
                        ): <Spinner/>
                    }
                </nav>
            </div>
            <div className="w-4/5 flex flex-col items-center">
                <Outlet/>
            </div>
        </section>
    )
}
// Exportar el layout
export default ControlLayout