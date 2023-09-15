// Componente de Mensaje de Alerta
const Alert = ({alerta}) => {
    return (
        <>
            <div className={`${alerta.error ? "bg-red-500":"bg-color4"} text-center font-bold text-white p-4 m-4 rounded-lg shadow-lg`}>
                <p className="uppercase">{alerta['message']}</p>
            </div>
        </>
    )
}

// 
export default Alert