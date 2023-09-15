// Componente para los inputs de cualquier formulario
const InputForm = ({
        // Informacion necesario
        props:
        {
            classes,        // Todas las clases como la del div, label y el input
            inputType,      // Tipo de Input
            labelText,      // Texto que tendrá la etiqueta Label
            stateValue,     // Hook para el valor del input
            setState,       // Hook para asignar el valor al input
            placeholder     // Mensaje de guia para el input
        }
    }) => {
    // Retorno HTML
    return (
        <>
            {/* Contenedor */}
            <div className={classes['divClasses']}>
                {/* Texto para el Input */}
                <label 
                    htmlFor={inputType} 
                    className={classes['labelClasses']}
                >
                    {labelText}:
                </label>
                {/* Entrada de datos */}
                <input 
                    id={inputType} 
                    name={inputType} 
                    type={inputType} 
                    onChange={e => setState(e.target.value)} 
                    value={stateValue}
                    className={classes['inputClasses']}
                    placeholder={placeholder}/>
            </div>
        </>
    )
}

// Exportar el componente completo
export default InputForm