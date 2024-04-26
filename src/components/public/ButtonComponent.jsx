// Componente
const ButtonComponent = ({title, type, onClick, customClasses}) => {
    return (
        <>
            <button 
                type={type}
                className={customClasses}
                onClick={() => onClick()}
            >
                {title}
            </button>
        </>
    )
}
// Exportamos el boton del submit para los formularios
export default ButtonComponent