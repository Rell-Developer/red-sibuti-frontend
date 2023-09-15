// Importaciones
import '../../Utils.css';

// Este es el componente para portada
const CoverComponent = ({
    props:{
        divClass,
        heightVH,
        bgClass
    }}) => {
    return (
        <>
            <div
                    className={`${divClass} ${bgClass}`}
                    style={{height:heightVH}}
            >
                <div></div>
                <div className='text-center'>
                    <h2 className='text-6xl font-bold text-white'>RED-SIBUTI</h2>
                    <h3 className='text-2xl italic text-white uppercase'>Encuentra tu oportunidad para crecer</h3>
                </div>
            </div>
        </>
    )
}

// Exportamos la portada
export default CoverComponent