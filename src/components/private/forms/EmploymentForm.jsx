import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../../public/Spinner.jsx';

import InputForm from "../../public/InputForm.jsx";
import Alert from "../../public/Alert.jsx";
import clienteAxios from '../../../config/axios.jsx'
// Componente
const EmploymentForm = () => {

    const [loading, setLoading] = useState(true);
    const [queryStatus, setQueryStatus] = useState(false);
    const [id, setId] = useState(null);

    const [position, setPosition] = useState('');
    const [status, setEstatus] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [description, setDescription] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [positionsList, setPositionList] = useState([]);
    const [state, setState] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [parish, setParish] = useState('');

    const [editMode, setEditMode] =  useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const getId = () => {
            // console.log(params);
            // console.log(params.id);
            // if (!params.id) {
            //     setId(0);
            // }else{
            //     setId(params.id)
            // }
            setTimeout(async() => {
                !params.id ? setId(0):setId(params.id);
                setLoading(false);

                if (!isNaN(params.id)) {
                    let { data:{data} } = await clienteAxios.post(`/get-employments/${params.id}`);
                    console.log(data);
    
                    setPosition(data.position);
                    setEstatus(data.status);
                    setVacancies(data.vacancies);
                    setDescription(data.description);
                    // setPosition(data.position);
                }
            }, 1000);
        }

        const searchPosition = async() => {
            // Buscar los cargos disponibles
            let { data } = await clienteAxios("/get-positions");

            console.log(data);

            data ? setPositionList(data.data):null;
        }

        searchPosition();

        if(params.id){
            getId();
        }else{
            setEditMode(true);
            setId(0);
            setLoading(false);
        }
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if ([status, vacancies, description].includes('')) {
            setAlerta({ error: true, message:'Todos los campos son obligatorios' });
            return setTimeout(() => setAlerta(null), 5000);
        }

        if (parseInt(vacancies) < 0) {
            setAlerta({ error: true, message:'Las vacantes no pueden ser un valor negativo' });
            setTimeout(() => setAlerta(null), 5000);
            return setVacancies(0);
        }

        if (parseInt(vacancies) < 1 && status === 'open') {
            setAlerta({ error: true, message:'Las vacantes no pueden ser menores a 1 si el empleo no esta cerrado' });
            return setTimeout(() => setAlerta(null), 5000);
        }

        // Colocando la animacion del spinner
        setLoading(true);

        try {
            let {data} = await clienteAxios.post('/create-employment', {position, status, vacancies, description});

            console.log(data);
            setLoading(false)
            setAlerta(data);
            setQueryStatus(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    const resetForm = (form) =>{
        setLoading(true);
        setQueryStatus(false);
        setAlerta({});

        setPosition('');
        setEstatus('');
        setVacancies('');
        setDescription('');
        setAlerta(null);
        setState('');
        setMunicipality('');
        setParish('');

        setLoading(false);
    }

    const viewPostulations = (e) => {
        e.preventDefault();
        // console.log("Ver postulaciones");
        navigate(`/inicio/control/empleos/postulaciones/${id}`);
    }

    return (
        <>  
            <div className="bg-white p-5 rounded-lg lg:w-1/2 w-full m-5 shadow-lg">
                {
                    loading ? (
                        <Spinner message='Cargando...'/>
                    ):(
                        <>
                            {
                                queryStatus ? (
                                    <>
                                        { alerta && <Alert alerta={alerta}/>}
                                        <div className="flex w-full justify-around">
                                            <button
                                                className="bg-color3 rounded-lg shadow-lg text-white font-bold p-3" 
                                                onClick={()=> resetForm(document.querySelector("form"))}
                                            >
                                                NUEVO EMPLEO
                                            </button>
                                            <button
                                                className="bg-slate-600 rounded-lg shadow-lg text-white font-bold p-3" 
                                                onClick={e=> navigate("/inicio")}
                                            >
                                                REGRESAR
                                            </button>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        <div className=" flex flex-col text-center">
                                            <h2 className="text-2xl font-bold">EMPLEO</h2>
                                            <form className="">
                                                { alerta && <Alert alerta={alerta}/>}
                                                <div className="grid grid-cols-6 my-5 gap-4">
                                                    <div className="col-span-6 lg:col-span-3 flex flex-col">
                                                        <label htmlFor="position" className="font-bold">Cargo</label>
                                                        {editMode ? (
                                                            <select name="position" id="position" className="bg-white p-3 border-2 rounded-lg" value={position} onChange={e => setPosition(e.target.value)}>
                                                                <option value="">Seleccione un cargo</option>
                                                                {
                                                                    positionsList.map( (pos,index) => (
                                                                        <>
                                                                            <option value={pos.id}>{pos.name}</option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </select>
                                                        ):(
                                                            <p>{position}</p>
                                                        )}
                                                    </div>
            
                                                    <div className="col-span-6 lg:col-span-6 flex flex-col">
                                                        <label htmlFor="status" className="font-bold">Estatus</label>
                                                        {editMode ? (
                                                            <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={status} onChange={e => setEstatus(e.target.value)}>
                                                                <option value="">Seleccione un estatus</option>
                                                                <option value="open">Abierto</option>
                                                                <option value="closed">Cerrado</option>
                                                            </select>
                                                        ):(
                                                            <p>{status === "open" ? "Abierto":"Cerrado"}</p>
                                                        )}
                                                    </div>
                                                            
                                                    {
                                                        editMode ? (
                                                            <>
                                                                {/* Input de las vacantes */}
                                                                <InputForm props={{ 
                                                                    classes:{
                                                                        divClasses:'col-span-6 flex flex-col',
                                                                        labelClasses:'font-bold',
                                                                        inputClasses:'bg-white p-3 border-2 rounded-lg'
                                                                    },
                                                                    inputType:'number',
                                                                    labelText:'Vacantes',
                                                                    stateValue:vacancies,
                                                                    setState:setVacancies,
                                                                    placeholder:'',
                                                                }}/>
                                                            </>
                                                        ):(
                                                            <>
                                                                <div className="col-span-6">
                                                                    <p className="font-bold">Vacantes</p>
                                                                    <p>{vacancies}</p>
                                                                </div>
                                                            </>
                                                        )
                                                    }
            
                                                    <div className="col-span-6 flex flex-col">
                                                        <label className="font-bold" htmlFor="description">Descripcion</label>
                                                        {   editMode ? (
                                                                <textarea 
                                                                    id="description" 
                                                                    name="description" 
                                                                    cols="30" rows="3" 
                                                                    className="bg-white p-3 border-2 rounded-lg"
                                                                    value={description}
                                                                    onChange={e => setDescription(e.target.value)}
                                                                ></textarea>
                                                            ):(
                                                                <p>{description}</p>
                                                            )
                                                        }
                                                    </div>
                                                    
                                                    <hr className="col-span-6 my-4" />
            
                                                    {/* <div>
                                                        
                                                    </div> */}
                                                    {/* <h3 className="font-bold text-xl col-span-6">UBICACION</h3>
            
                                                    <div className="col-span-6 grid grid-cols-6 gap-4">
                                                        <div className="col-span-6 lg:col-span-2 flex flex-col">
                                                            <label htmlFor="status" className="font-bold">Estado</label>
                                                            <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={state} onChange={e => setState(e.target.value)}>
                                                                <option value="">Seleccione un estado</option>
                                                                <option value="open">Abierto</option>
                                                                <option value="closed">Cerrado</option>
                                                            </select>
                                                        </div>
            
                                                        <div className="col-span-6 lg:col-span-2 flex flex-col">
                                                            <label htmlFor="status" className="font-bold">Municipio</label>
                                                            <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={municipality} onChange={e => setMunicipality(e.target.value)}>
                                                                <option value="">Seleccione un municipio</option>
                                                                <option value="open">Abierto</option>
                                                                <option value="closed">Cerrado</option>
                                                            </select>
                                                        </div>
            
                                                        <div className="col-span-6 lg:col-span-2 flex flex-col">
                                                            <label htmlFor="status" className="font-bold">Parroquia</label>
                                                            <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={parish} onChange={e => setParish(e.target.value)}>
                                                                <option value="">Seleccione una parroquia</option>
                                                                <option value="open">Abierto</option>
                                                                <option value="closed">Cerrado</option>
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                    
                                                {editMode ? (
                                                        <button className="bg-color4 rounded-lg shadow-lg text-white font-bold p-3" type="submit" onClick={handleSubmit}>GUARDAR</button>
                                                    ):(
                                                        <button 
                                                            className="bg-color4 rounded-lg shadow-lg text-white font-bold p-3"
                                                            onClick={e => viewPostulations(e)}
                                                        >Ver Postulaciones</button>
                                                    )
                                                }
                                            </form>
                                        </div>
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
// Exportamos el componente
export default EmploymentForm