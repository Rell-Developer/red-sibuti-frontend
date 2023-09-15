// Componente
const Cell = ({element}) => {
    return (
        <>
            {
                element === 'checkbox' ? (
                    <div className="p-2 bg-white shadow">
                        <input type="checkbox" />
                    </div>
                ):(
                    <div className="p-2 bg-white shadow">{element}</div>
                )
            }
        </>
    )
}
// Exportamos el componente
export default Cell