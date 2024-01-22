import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import { FaTools, FaBriefcase, FaMapMarkedAlt, FaHandHoldingHeart } from "react-icons/fa";
import { MdMoneyOff } from "react-icons/md";

const HomeCarousel = () => {

    useEffect(()=> {
        const init = () => {
            // var mySwiper = new Swiper('.swiper-container', {
            //     // Configuración del slider
            //     slidesPerView: 1,
            //     spaceBetween: 10,
            //     loop: true, // Para que el slider sea infinito
            //     autoplay: {
            //         delay: 3000, // Tiempo en milisegundos entre cada transición automática
            //     },
            //     pagination: {
            //         el: '.swiper-pagination',
            //         clickable: true,
            //     },
            //     navigation: {
            //         nextEl: '.swiper-button-next',
            //         prevEl: '.swiper-button-prev',
            //     },
            // });
        }
        init()
    })

    return (
        <>
            <div className="w-full">
                <div className="swiperContainer">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            el: ".pagination",
                            clickable: true
                        }}
                        slidesPerView={4}
                        breakpoints={{
                            "@0.00":{
                                slidesPerView: 1,
                                spaceBetween: 25
                            },
                            "@0.50":{
                                slidesPerView: 1,
                                spaceBetween: 25
                            },
                            "@1.00":{
                                slidesPerView: 1,
                                spaceBetween: 25
                            },
                            "@1.25":{
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            "@1.50":{
                                slidesPerView: 1,
                                spaceBetween: 30
                            },
                            "@1.75":{
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="w-full h-96 flex items-center">
                                <div className="w-5/6 mx-auto grid-cols-12 grid gap-4 items-center">
                                    <div className="col-span-6 flex justify-center items-center">
                                        <div className="rounded-full bg-white shadow border p-10">
                                            <img 
                                                src="/public/img/RED-SIBUTI.png" 
                                                alt="..."
                                                width={230}/>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <h2 className="text-white text-6xl">
                                            Bienvenido a {""}
                                            <span className="text-7xl font-bold">RED SIBUTI</span>,
                                            un lugar de crecimiento y posibilidades
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full h-96 flex items-center">
                                <div className="w-5/6 mx-auto grid-cols-12 grid gap-4 items-center">
                                    <div className="col-span-6">
                                        <h2 className="text-white text-6xl">
                                            Un lugar donde {""}
                                            <span className="text-7xl font-bold">podrás</span>
                                        </h2>
                                    </div>
                                    <div className="col-span-6 flex justify-center items-center">
                                        <div className='flex justify-between w-5/6 mx-auto my-2'>
                                            <div className="flex flex-col items-center">
                                                <div className='p-10 rounded-full shadow border-2 bg-white'>
                                                    <FaBriefcase size={110} color='#38A3A5'/>
                                                </div>
                                                <p className="text-white my-3 font-bold text-lg">Encuentrar tu empleo</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className='p-10 rounded-full shadow border-2 bg-white'>
                                                    <FaTools size={110} color='#38A3A5'/>
                                                </div>
                                                <p className="text-white my-3 font-bold text-lg">Ofrecer tu servicio</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className='p-10 rounded-full shadow border-2 bg-white'>
                                                    <FaMapMarkedAlt size={110} color='#38A3A5'/>
                                                </div>
                                                <p className="text-white my-3 font-bold text-lg">Desde cualquier lugar</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full h-96 flex items-center">
                                <div className="w-5/6 mx-auto grid-cols-12 grid gap-4 items-center">
                                    <div className="col-span-6 flex justify-center items-center">
                                        <div className='flex justify-around w-5/6 mx-auto my-2'>
                                            <div className="flex flex-col items-center">
                                                <div className='p-10 rounded-full shadow border-2 bg-white'>
                                                    <MdMoneyOff size={110} color='#38A3A5'/>
                                                </div>
                                                <p className="text-white my-3 font-bold text-lg">Totalmente gratis</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className='p-10 rounded-full shadow border-2 bg-white'>
                                                    <FaHandHoldingHeart size={110} color='#38A3A5'/>
                                                </div>
                                                <p className="text-white my-3 font-bold text-lg">Sumamente sencillo</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 flex justify-center items-end flex-col">
                                        <h2 className="text-white text-6xl mb-5">
                                            ¿Que esperás para ingresar? {""}
                                        </h2>
                                        <a 
                                            href="/iniciar-sesion" 
                                            className="bg-white px-4 py-2 font-bold uppercase text-black rounded w-1/4 text-center"
                                        >
                                            haz clic aquí
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="pagination"></div>
            </div>
        </>
    );
}

export default HomeCarousel;