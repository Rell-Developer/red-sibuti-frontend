import { GiStarFormation } from "react-icons/gi";
import { Link } from "react-router-dom";
const InfoSection = () => {
    return (
        <section className='w-full bg-color4 p-5 h-96 flex justify-center'>
            <div className='w-full flex lg:w-5/6 mx-auto'>
                <div className='flex flex-col lg:w-5/4 bg justify-center'>
                    <p className='text-5xl text-color1 w-10/12'>
                        Puedes conseguir tu gran oportunidad {''}
                        <span className='font-bold text-6xl uppercase'>
                            Aqui!
                        </span>
                    </p>
                    <Link to='/iniciar-sesion' className='bg-color1 w-28 p-2 shadow text-center rounded my-5'>
                        Unirme
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-center mx-auto">
                    <div className="bg-white shadow border rounded-full p-5 flex justify-center my-5">
                        <GiStarFormation
                            size={150}
                            color="#38A3A5"
                        />
                    </div>
                    <p className="italic text-white font-bold">
                        Tu próximo trabajo te espera
                    </p>
                </div>
            </div>
        </section>
    )
}

export default InfoSection