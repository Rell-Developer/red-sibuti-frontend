// Importaciones
import "../../../public/css/spinner.css";
// Componente
const Spinner = ({message = "Cargando..."}) => {
    return (
        <>
            <div className="w-full text-center flex flex-col items-center">
                <div className="loadingio-spinner-dual-ring-2hd2n5wlcgj">
                    <div className="ldio-u719fu4ksl">
                        <div></div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <p className={`text-black my-2`}>{message}</p>
            </div>
        </>
    )
}
// Exportar Spinner
export default Spinner