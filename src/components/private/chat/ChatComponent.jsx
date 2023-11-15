// Importaciones
import { useState, useEffect } from "react";
import MessageComponent from "./MessageComponent.jsx";
import Spinner from '../../public/Spinner.jsx';

// Componente
const ChatComponent = () => {
    // States
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    let messages = [
        {
            id: 1,
            body: 'Mensaje de julian, estoy interesado en el puesto de trabajo',
            author: 'Julian Julian',
            own: false,
            createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        },
        {
            id: 2,
            body: 'Hola julian, estamos interesados en tu perfil, por favor, pasa por la empresa para una entrevista de trabajo el dia Lunes 30 de Octubre.',
            author: '',
            own: true,
            createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div className={`${open ? 'h-3/5':''} absolute bottom-0 right-0 shadow-lg w-96 flex flex-col mx-2 rounded-t-md`}>
            <div 
                id="headerChat" 
                className={`${open ? 'absolute':''} bg-color4 text-white font-bold h-16 flex items-center justify-between rounded-t-md shadow-lg cursor-pointer w-full`}
                onClick={() => setOpen(!open)}
            >
                <div className="mx-2">
                    <p>JULIAN JULIAN</p>
                </div>
                <div className="mx-2">
                    <button>Cerrar</button>
                </div>
            </div>
            <div id="bodyChat" className={`bg-color1 h-full overflow-scroll rounded-t-md ${open ? '':'hidden'}`}>
                <div className="grid grid-cols-12 w-full overflow-scroll my-20">
                    {
                        loading ? (
                            <>
                                <div className="col-span-full">
                                    <Spinner/>
                                </div>
                            </>
                        ):(
                            messages.map( (msg,index) => <MessageComponent key={index} message={msg}/>)
                        )
                    }
                </div>
            </div>
            <div id="footerChat" className={`bg-color4 h-16 flex items-center justify-around absolute bottom-0 w-full ${open ? '':'hidden'}`}>
                <input type="text" className="bg-white rounded-lg p-2 w-4/6" placeholder="escriba su mensaje..."/>
                <button>enviar</button>
            </div>
        </div>
    )
}

export default ChatComponent