// Importaciones
import { useState, useEffect } from "react";
import MessageComponent from "./MessageComponent.jsx";
import Spinner from '../../public/Spinner.jsx';
// Importaciones
import { io } from 'socket.io-client';

const socket = io('http://localhost:3803');

// Componente
const ChatComponent = () => {
    // States
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [conversationId, setConversationId] = useState(null);

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
        // Evento que retorna cuando el socket se conecta correctamente
        socket.on('connect', ()=>{
            console.log('Conectado al socket');
    
        });        
        
        socket.on('chat_message', (data)=>{
            if (JSON.parse(sessionStorage.getItem("user")).name === data.author) {
                data.own = true;
            }else{
                data.own = false;
            }
            console.log(data);
            setMessagesList(messages => [...messages, data]);
        });
    
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () =>{
            socket.off('connect');
            socket.off('chat_message');
        }
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);

        if (message === '') {
            return
        }

        socket.emit('chat_message', {
            body: message,
            conversationId,
            createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            author: JSON.parse(sessionStorage.getItem("user")).name
        });

        return setMessage('');
    }

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
                            messagesList.map( (msg,index) => <MessageComponent key={index} message={msg}/>)
                        )
                    }
                </div>
            </div>
            <div id="footerChat" className={`bg-color4 h-16 flex items-center justify-around absolute bottom-0 w-full ${open ? '':'hidden'}`}>
                <form onSubmit={(e)=> sendMessage(e)} className="w-5/6 flex justify-between">
                    <input type="text" className="bg-white rounded-lg p-2 w-5/6" placeholder="escriba su mensaje..." value={message} onChange={e => setMessage(e.target.value)}/>
                    <button type="submit">enviar</button>
                </form>
            </div>
        </div>
    )
}

export default ChatComponent