// Importaciones
import CellGroup from "../../components/private/CellGroup.jsx";
import HeaderNav from "../../components/private/HeaderNav.jsx";
import clienteAxios from "../../config/axios.jsx";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

// Layouts
import SecondLayout from "./SecondLayout.jsx";

import BriefCaseSVG from "../../components/public/svg/BriefCaseSVG.jsx";

// Componente Layout
const MainLayout = ({section}) => {

    // UseState
    const [users, setUsers] = useState([]);
    const [optionSelected, setOptionSelected] = useState('empleos');

    // UseEffect de la seccion de Usuarios
    // useEffect(() => {
    //     const getUsers = async()=>{
    //         try {
    //             let { data } = await clienteAxios('/users');
    //             const usersList = [];

    //             for (let i = 0; i < data.length; i++) {
    //                 usersList.push({
    //                     id: data[i].id,
    //                     email: data[i].email,
    //                     password: data[i].password,
    //                     // id: data[i].id,                        
    //                 })
    //             }
    //             setUsers(usersList);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }


    //     getUsers();
    // }, [])

    const getEmployers = () =>{
        try {
            console.log();
        } catch (error) {
            console.log(error.message);
        }
    }
    

    return (
        <>
            <main className="flex flex-col">
                {/* Cabecera */}
                <HeaderNav height={"9vh"}  props={{optionSelected, setOptionSelected}}/>
                <section className="w-full flex flex-col h-100 items-center bg-color1" style={{height:"91vh"}}>
                    <Outlet/>
                </section>
                {/* <section className="bg-color1 flex" style={{height: "91vh"}}>

                    {
                        section === 'employments' ? (
                            <SecondLayout/>
                        ):(
                            <>
                                Seccion
                                <div className="w-1/5">
                                    <nav className="flex flex-col mx-auto w-5/6 my-5">
                                        <div className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all">
                                            <img src="/public/svg/users.svg" alt="usuarios" width={30}/>
                                            <p className="font-bold text-white mx-2">USUARIOS</p>
                                        </div>
                                        <div className="flex items-center bg-color4 rounded p-4 shadow my-2 cursor-pointer hover:shadow-lg transition-all">
                                            <BriefCaseSVG fill={"#fff"}/>
                                            <p className="font-bold text-white mx-2">EMPLEOS</p>
                                        </div>
                                    </nav>
                                </div>
                                <div className="w-4/5 flex flex-col items-center">
                                    <div className="my-10">
                                        <h2 className="text-4xl font-bold text-color5">
                                            USUARIOS
                                        </h2>
                                    </div>
                                    <div className="mx-auto w-5/6">
                                        <div className="grid grid-cols-3 gap-0 text-center">
                                                <div className="col-span-3 my-5">
                                                    <Link to="/home/employers/new">
                                                        <button 
                                                            className="bg-color4 p-3 rounded-lg shadow font-bold text-white"
                                                        >+ NUEVO EMPLEO</button>
                                                    </Link>
                                                </div>
                                            {
                                                users.map( user => <CellGroup user={user}/>)
                                            }
                                            <div className="p-2 bg-white shadow">
                                                <input type="checkbox" />
                                            </div>
                                            <div className="p-2 bg-white shadow">ID</div>
                                            <div className="p-2 bg-white shadow">
                                                Correo Electronico
                                            </div>
                                            <div className="p-2 bg-white shadow">
                                                Contrasena
                                            </div>
                                            <div className="p-2 bg-white shadow"></div>


                                            <div className="p-2 bg-white shadow">
                                                <input type="checkbox" />
                                            </div>
                                            <div className="p-2 bg-white shadow">2  </div>
                                            <div className="p-2 bg-white shadow">
                                                roque3@gmail.com
                                            </div>
                                            <div className="p-2 bg-white shadow">
                                                12313123    
                                            </div>
                                            <div className="p-2 bg-white shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </section> */}
            </main>
        </>
    )
}
// Se exporta el layout
export default MainLayout