import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../../public/Spinner.jsx';

import InputForm from "../../public/InputForm.jsx";
import Alert from "../../public/Alert.jsx";
import clienteAxios from '../../../config/axios.jsx';
import DPTaxios, { DPTUserLogin } from "../../../config/DPTaxios.jsx";

// Libreria para el mapa
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '/public/css/custom-leaflet.css'
// Coordenadas de caracas
// 10.470575609172524, -66.90410224619053

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

    // Datos de ubicacion
    const [ubication, setUbication] = useState({        // Objeto que tendra los datos de estado, municipio y parroquia
        state:{},
        municipality:{},
        parish:{}
    });     
    const [location, setLocation] = useState(null);     // Objeto que tendra los datos de las coordenadas del lugar (latitud y longitud)
    const [states, setStates] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [parishes, setParishes] = useState([]);

    const [editMode, setEditMode] =  useState(false);
    const [token, setToken] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{

        // console.log(import.meta.env);
        // import.meta.env.VITE_PRUEBA = 'este es de prueba';
        // console.log(import.meta.env);


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
    
                    setPosition(data.cargo.name);
                    setEstatus(data.status);
                    setVacancies(data.vacancies);
                    setDescription(data.description);
                    setLocation({ lat:data.lat, lng: data.lng})
                    setUbication({
                        state_name: data.state_name,
                        municipality_name: data.municipality_name,
                        parish_name: data.parish_name,
                        state_id: data.state_id,
                        municipality_id: data.municipality_id,
                        parish_id: data.parish_id,
                    })
                }
            }, 100);
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
            // Como es modo edicion o creacion, invocamos a la funcion de estructura de ubicacion
            searchUbications()
            // Establecemos el modo edicion
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

        if (!location) {
            setAlerta({ error: true, message:'Debe seleccionar la ubicacion del empleo u oficina.' });
            return setTimeout(() => setAlerta(null), 5000);
        }

        // Colocando la animacion del spinner
        setLoading(true);

        try {
            let user = JSON.parse(sessionStorage.getItem('user'));
            let {data} = await clienteAxios.post('/create-employment', {cargoId: position.id, status, vacancies, description, usuarioId: user.id, location, ubication});

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

    const searchUbications = async () =>{
        try {
            let {data: {token}} = await DPTUserLogin();
            // console.log(token);
            setToken(token)
            let statesDPT = await DPTaxios(`v1/listadoEntidad?token=${token}`);
            // console.log(statesDPT.data.data);
            let newStates = statesDPT.data.data.map(state => {
                return {
                    id: state.cod_entidad_ine,
                    name: state.entidad_ine
                }
            });
            setStates(newStates);
        } catch (error) {
            console.log('Hubo un error al buscar los estados, municipios y parroquias');
            console.log(error.message);
        }
    }

    const viewPostulations = (e) => {
        e.preventDefault();
        // console.log("Ver postulaciones");
        navigate(`/inicio/control/empleos/postulaciones/${id}`);
    }

    const LocationMarker = () => {

        const map = useMapEvents({
            // cuando hagan clic en el mapa
            click({latlng}) {
                if (editMode) {
                    // Tomamos la posicion seleccionada
                    setLocation(latlng);
                }
            }
        })
        
        return location === null ? null : (
            <Marker position={location}>
                <Popup>
                    <div className="flex flex-col">
                        Lugar Seleccionado
                        <em className="text-gray-500 text-sm font-bold">{location.lat},{location.lng}</em>
                    </div>
                </Popup>
            </Marker>
        )
    }

    const searchMunicipalities = async({target}) =>{
        try {
            // Asignamos
            setUbication({
                ...ubication,
                state_id: target.value,
                state_name: target.selectedOptions[0].textContent
            });

            console.log(target);

            // Nos Logeamos para obtener el token de consulta y 
            // let { token } = await DPTUserLogin();
            let { data } = await DPTaxios(`v1/listadoMunicipio?token=${token}&&codEntidad=${target.value}`);
            console.log(data);

            let municips = data.data.map( m =>{
                return {
                    id: m.cod_municipio_ine,
                    name: m.municipio_ine
                }
            });
            setMunicipalities(municips)
        } catch (error) {
            console.log(error.message);
        }
    }

    const searchParishes = async({target}) =>{
        try {
            // Asignamos
            setUbication({
                ...ubication,
                municipality_id: target.value,
                municipality_name: target.selectedOptions[0].textContent
            });

            // Nos Logeamos para obtener el token de consulta y 
            // let { token } = await DPTUserLogin();
            let { data } = await DPTaxios(`v1/listadoParroquia?token=${token}&&codEntidad=${ubication.municipality_id}&&codMunicipio=${target.value}`);
            // console.log(data);

            let parroq = data.data.map( m =>{
                return {
                    id: m.cod_parroquia_ine,
                    name: m.parroquia_ine
                }
            });
            setParishes(parroq)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>  
            <div className="bg-white p-5 rounded-lg lg:w-4/6 w-full m-5 shadow-lg h-5/6">
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
                                        <div className="overflow-scroll flex flex-col text-center h-full">
                                            <h2 className="text-2xl font-bold">EMPLEO</h2>
                                            <form className="">
                                                { alerta && <Alert alerta={alerta}/>}
                                                <div className="grid grid-cols-6 my-5 gap-4">
                                                    <div className="col-span-6 lg:col-span-2 flex flex-col">
                                                        <label htmlFor="position" className="font-bold">Cargo</label>
                                                        {editMode ? (
                                                            <select 
                                                                id="position" 
                                                                name="position" 
                                                                className="bg-white p-3 border-2 rounded-lg" 
                                                                value={position.id} 
                                                                onChange={e => {
                                                                    setPosition({
                                                                        id: e.target.value,
                                                                        name: e.target.textContent
                                                                    });
                                                                }}>
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
            
                                                    <div className="col-span-6 lg:col-span-2 flex flex-col">
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
                                                                        divClasses:'col-span-2 flex flex-col',
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
                                                                <div className="col-span-2">
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

                                                    <div className="flex flex-col col-span-6">
                                                        <h3 className="text-xl font-bold">Datos de Ubicacion</h3>

                                                        <div className="w-full h-full grid grid-cols-9 justify-around my-5">
                                                            <div className="flex flex-col col-span-1 lg:col-span-3">
                                                                <p className="font-bold">Estado</p>
                                                                {
                                                                    !editMode ? (
                                                                        <p>{ubication.state_name}</p>
                                                                    ):(
                                                                        <select 
                                                                            id="state" 
                                                                            name="state" 
                                                                            className="bg-white p-2 border-2 rounded-lg"
                                                                            onChange={e => searchMunicipalities(e)}
                                                                            value={ubication.state_id || ''}
                                                                        >
                                                                            <option value="">Seleccione un Estado</option>
                                                                            {states.map(state => <option value={state.id}>{state.name}</option>)}
                                                                        </select>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="flex flex-col col-span-1 lg:col-span-3">
                                                                <p className="font-bold">
                                                                    Municipio
                                                                </p>
                                                                {
                                                                    !editMode ? (
                                                                        <p>{ubication.municipality_name}</p>
                                                                    ):(
                                                                        <>
                                                                            {
                                                                                municipalities.length > 0 && (
                                                                                        <select 
                                                                                            id="municipality" 
                                                                                            name="municipality" 
                                                                                            className="bg-white p-2 border-2 rounded-lg" 
                                                                                            onChange={e=> searchParishes(e)}
                                                                                            value={ubication.municipality_id || ''}
                                                                                        >
                                                                                            <option value="">Seleccione un Municipio</option>
                                                                                            {municipalities.map(state => <option value={state.id}>{state.name}</option>)}
                                                                                        </select>
                                                                                )
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="flex flex-col col-span-1 lg:col-span-3">
                                                                <p className="font-bold">
                                                                    Parroquia
                                                                </p>
                                                                {
                                                                    !editMode ? (
                                                                        <p>{
                                                                            ubication.parish_name ? 
                                                                                ubication.parish_name !== "" ? 
                                                                                    ubication.parish_name : ubication.municipality_name 
                                                                                : 
                                                                                ubication.municipality_name
                                                                            }
                                                                        </p>
                                                                    ):(
                                                                        <>
                                                                            {
                                                                                parishes.length > 0 && (
                                                                                        <select 
                                                                                            id="parish" 
                                                                                            name="parish" 
                                                                                            className="bg-white p-2 border-2 rounded-lg"
                                                                                            onChange={e => setUbication({
                                                                                                ...ubication,
                                                                                                parish_id: e.target.value,
                                                                                                parish_name: e.target.selectedOptions[0].textContent
                                                                                            })}
                                                                                            value={ubication.parish_id || ''}
                                                                                        >
                                                                                            <option value="">Seleccione una Parroquia</option>
                                                                                            {parishes.map(state => <option value={state.id}>{state.name}</option>)}
                                                                                        </select>
                                                                                )
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="w-full h-full">
                                                            <MapContainer 
                                                                center={{ lat:'10.470575609172524', lng:'-66.90410224619053'}} 
                                                                zoom={6}
                                                                scrollWheelZoom={false}
                                                            >
                                                                <TileLayer 
                                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                />
                                                                <LocationMarker/>
                                                            </MapContainer>
                                                        </div>
                                                    </div>
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