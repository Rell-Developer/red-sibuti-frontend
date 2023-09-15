// Componente
const ButtonSubmit = ({title}) => {
    return (
        <>
            <button 
                type="submit"
                className='bg-color4 hover:bg-color3 text-white w-full font-bold p-2 rounded-lg shadow-lg transition-all uppercase'
            >
                {title}
            </button>
        </>
    )
}
// Exportamos el boton del submit para los formularios
export default ButtonSubmit