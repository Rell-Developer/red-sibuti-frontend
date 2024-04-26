import { useState, useEffect } from "react"
import { useParams, Link} from "react-router-dom"
import Spinner from "./Spinner.jsx"
import clienteAxios from "../../config/axios.jsx";
import Alert from "./Alert.jsx";

const ConfirmAccount = () => {

    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();

    useEffect(()=>{

        const searchToken = async() => {
            console.log(params);

            const {data} = await clienteAxios.post(`/account-confirm/${params.token}`);
            console.log(data);

            setAlerta(data);
            setLoading(false);
            // if (data.error) {
            //     setAlerta(data);
            // }
        }

        searchToken();
    },[])

    return (
        <>
            {
                loading ? (
                    <Spinner/>
                ):(
                    <>
                        <div className="flex flex-col items-center">
                            <Alert alerta={alerta}/>

                            <Link 
                                to="/iniciar-sesion"
                                className="
                                    bg-color5 text-white font-bold p-4 uppercase rounded-lg shadow-lg transition-all
                                    hover:bg-color4 hover:shadow-none
                                "
                            >Regresar al Inicio</Link>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ConfirmAccount