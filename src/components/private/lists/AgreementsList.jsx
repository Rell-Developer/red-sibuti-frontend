// Importaciones
import { useState, useEffect } from "react";
import Spinner from '../../public/Spinner.jsx';
import AgreementsCard from "../cards/AgreementsCard.jsx";
import clienteAxios from "../../../config/axios.jsx";
// Componente
const AgreementsList = ({user}) => {
    
    const [agreements, setAgreements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        // Busqueda de los acuerdos del usuario
        const searchAgreements = async() => {
            try {
                const { data } = await clienteAxios(`/users/get-agreements/${user.id || JSON.parse(sessionStorage.getItem("user")).id}`);
                console.log("Agremeents");
                console.log(data);

                setLoading(false);
                if (data.error) {
                    console.log(data.message);
                    return
                }

                setAgreements(data.result);

            } catch (error) {
                console.error("Hubo un error al buscar los acuerdos del usuario");
                console.error(error.message);
            }
        }
        searchAgreements();
    }, []);

    return (
        <>
            {
                loading ? (<Spinner/>):(
                    <>
                        {
                            agreements.length > 0 ? (
                                <>
                                    { agreements.map( agr => <AgreementsCard agreement={agr}/>)}
                                </>
                            ):(
                                <h2>No tiene acuerdos</h2>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default AgreementsList;