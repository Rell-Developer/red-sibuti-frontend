// Libreria para el mapa
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '/public/css/custom-leaflet.css'
// import { FaMapMarkerAlt, FaBriefcase, FaMapMarkedAlt } from "react-icons/fa";
import clienteAxios from '../../config/axios';
import Spinner from '../../components/public/Spinner.jsx';

const EmploymentSection = () => {
    const [employments, setEmployments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const searchEmployments = async() => {
            try {
                const { data } = await clienteAxios("get-public-employments");
                setEmployments(data.result);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }
        searchEmployments();
    }, []);

    const LocationMarker = ({employment}) => {        
        return (employment === null && employment.employment.location) ? null : (
            <Marker position={employment?.employment.location}>
                <Popup>
                    <div className="flex flex-col">
                        <em className="text-gray-500 text-sm font-bold"> {employment.company.name}</em>
                        necesita a <em className="text-gray-500 text-sm font-bold"> {employment.employment.vacancies} {employment.employment.position.name}</em>
                    </div>
                </Popup>
            </Marker>
        )
    }
    return (
        <section className='w-full px-5 py-10'>
            <div className='w-full flex flex-col lg:flex-row lg:w-5/6 mx-auto justify-between'>
                <div className='flex flex-col lg:w-1/2'>
                    <div className="w-full h-full">
                        {
                            loading ? <Spinner/> :(
                                <MapContainer 
                                    center={{ lat:'10.470575609172524', lng:'-66.90410224619053'}} 
                                    zoom={5}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer 
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {
                                        employments.map( (employment) => <LocationMarker employment={employment} />)
                                    }
                                </MapContainer>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col lg:w-1/2 bg justify-center text-right bg-red-00'>
                    <div className='flex flex-col items-end'>
                        {/* <div className='flex justify-around w-1/2 mx-auto my-2'>
                            <div className='p-5 rounded-full shadow border-2'>
                                <FaBlackTie size={40} color='#38A3A5'/>
                            </div>
                            <div className='p-5 rounded-full shadow border-2'>
                                <FaBriefcase size={40} color='#38A3A5'/>
                            </div>
                            <div className='p-5 rounded-full shadow border-2'>
                                <FaMapMarkedAlt size={40} color='#38A3A5'/>
                            </div>
                        </div> */}
                        <p className='text-5xl text-color5 w-10/12 justify-end'>
                            { loading ? "Hay ":`Mas de ${employments.length} `}
                            empleos registrados en {''}
                            <span className='font-bold text-6xl uppercase'>
                                Venezuela
                            </span>
                        </p>
                    </div>
                    <a 
                        href='/iniciar-sesion' 
                        className='bg-color3 text-white flex self-end justify-center w-48 py-2 px-5 shadow font-bold rounded my-10 uppercase'
                    >
                        Buscar Empleos
                    </a>
                </div>
            </div>
        </section>
    )
}

export default EmploymentSection;