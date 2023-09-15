// Importaciones
import { Link } from "react-router-dom";

// Componente
const OptionHeader = ({option, changeSection}) => {

    // const changeColor = node =>{
    //     let options = document.querySelectorAll(".option-nav");

    //     options.forEach( option => {
    //         if (node.id === option.id) {
    //             console.log("es el id");
    //             option.classList.add("bg-white", "shadow-lg");
    //         }else{
    //             option.classList.remove("bg-white", "shadow-lg");
    //         }
    //     })
    // }

    return (
        <>
            <Link to={option.link}>
                <div 
                    id={option.id}
                    className={`${option.selected ? 'bg-white shadow-lg':''} flex flex-col justify-center items-center uppercase font-bold rounded-lg p-2 mx-2 cursor-pointer option-nav`}
                    // onClick={e => changeColor(e.target)}
                    onClick={e => changeSection(e.target)}
                >
                    {/* <img src="/svg/config.svg" alt="users-svg" width={"30"}/> */}
                    {<option.svg fill={option.selected ? '#38A3A5':'#fff'}/>}
                    <p className={`${option.selected ? 'text-color4':'text-white'} text-sm`}>{option.title}</p>  
                </div>
            </Link>
        </>
    )
}
// Exportacion del componente
export default OptionHeader