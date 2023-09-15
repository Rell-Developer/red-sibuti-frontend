import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../../public/Spinner.jsx';

import InputForm from "../../public/InputForm.jsx";
import Alert from "../../public/Alert.jsx";
import clienteAxios from '../../../config/axios.jsx'
// Componente
const EmploymentForm = () => {

    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(null);

    const [position, setPosition] = useState('');
    const [status, setEstatus] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [description, setDescription] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [state, setState] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [parish, setParish] = useState('');

    const params = useParams();

    useEffect(()=>{
        const getId = () => {
            // console.log(params);
            // console.log(params.id);
            // if (!params.id) {
            //     setId(0);
            // }else{
            //     setId(params.id)
            // }
            setTimeout(() => {
                
                !params.id ? setId(0):setId(params.id)
                setLoading(false)
            }, 1000);
        }

        getId();
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if ([position, status, vacancies, description].includes('')) {
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
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>  
            <div className="bg-white p-5 rounded-lg w-1/2 m-5 shadow-lg">
                {
                    loading ? (
                        <Spinner message='Cargando...'/>
                    ):(
                        <>
                            <div className=" flex flex-col text-center">
                                <h2 className="text-2xl font-bold">NUEVO EMPLEO</h2>
                                <form className="" onSubmit={handleSubmit}>
                                    { alerta && <Alert alerta={alerta}/>}
                                    <div className="grid grid-cols-6 my-5 gap-4">
                                        <div className="col-span-3 flex flex-col">
                                            <label htmlFor="position" className="font-bold">Cargo</label>
                                            <select name="position" id="position" className="bg-white p-3 border-2 rounded-lg" value={position} onChange={e => setPosition(e.target.value)}>
                                                <option value="">Seleccione un cargo</option>
                                                <option value="secretaria">Secretaria</option>
                                                <option value="obrero">Obrero</option>
                                            </select>
                                        </div>

                                        <div className="col-span-3 flex flex-col">
                                            <label htmlFor="status" className="font-bold">Estatus</label>
                                            <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={status} onChange={e => setEstatus(e.target.value)}>
                                                <option value="">Seleccione un estatus</option>
                                                <option value="open">Abierto</option>
                                                <option value="closed">Cerrado</option>
                                            </select>
                                        </div>

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

                                        <div className="col-span-6 flex flex-col">
                                            <label className="font-bold" htmlFor="description">Descripcion</label>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                cols="30" rows="3" 
                                                className="bg-white p-3 border-2 rounded-lg"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        
                                        <hr className="col-span-6 my-4" />

                                        {/* <div>
                                            
                                        </div> */}
                                        <h3 className="font-bold text-xl col-span-6">UBICACION</h3>

                                        <div className="col-span-6 grid grid-cols-6 gap-4">
                                            <div className="col-span-2 flex flex-col">
                                                <label htmlFor="status" className="font-bold">Estado</label>
                                                <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={state} onChange={e => setState(e.target.value)}>
                                                    <option value="">Seleccione un estado</option>
                                                    <option value="open">Abierto</option>
                                                    <option value="closed">Cerrado</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2 flex flex-col">
                                                <label htmlFor="status" className="font-bold">Municipio</label>
                                                <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={municipality} onChange={e => setMunicipality(e.target.value)}>
                                                    <option value="">Seleccione un municipio</option>
                                                    <option value="open">Abierto</option>
                                                    <option value="closed">Cerrado</option>
                                                </select>
                                            </div>

                                            <div className="col-span-2 flex flex-col">
                                                <label htmlFor="status" className="font-bold">Parroquia</label>
                                                <select name="status" id="status" className="bg-white p-3 border-2 rounded-lg" value={parish} onChange={e => setParish(e.target.value)}>
                                                    <option value="">Seleccione una parroquia</option>
                                                    <option value="open">Abierto</option>
                                                    <option value="closed">Cerrado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    

                                    <button className="bg-color4 rounded-lg shadow-lg text-white font-bold p-3" type="submit">GUARDAR</button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}
// Exportamos el componente
export default EmploymentForm